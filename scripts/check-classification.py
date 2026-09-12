#!/usr/bin/env python3
"""Check that every sector is classified and that the classification is coherent.

A convention nobody checks drifts. This runs in CI and locally:

    python3 scripts/check-classification.py

It answers five questions a reviewer would otherwise have to answer by hand.
Does every sector directory carry a sector.yaml? Does every sector.yaml carry a
NOGA division, unless it is the reference model? Does the classification it
carries match the codified NOGA entry in noga-2025.yaml? Do two sectors claim
the same division? Does every file a sector.yaml points at actually exist?

It also looks codes up, so that adding a sector does not mean transcribing a
classification by hand:

    python3 scripts/check-classification.py --noga            # the whole list
    python3 scripts/check-classification.py --noga health     # search
    python3 scripts/check-classification.py --noga 86         # one division

Exit code 0 means the classification is coherent. Exit code 1 lists what is not.
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML is required: pip install pyyaml")

ROOT = Path(__file__).resolve().parent.parent

# The codified NOGA 2025 entries. Sections are complete, divisions are the
# working subset described in the file's own header.
CATALOGUE_PATH = ROOT / "noga-2025.yaml"

# Directories at the repository root that are not sectors.
NOT_SECTORS = {".git", ".github", "assets", "scripts", "node_modules"}

# A family is a body of work. A flow is one exchange inside it. They move at
# different speeds, so they have different vocabularies.
FAMILY_STATUS = {"draft", "specified", "in-progress", "stable"}
FLOW_STATUS = {"draft", "specified", "roadmap", "partial", "implemented", "in-progress", "stable"}

NOGA_KEYS = ("division", "division_title", "section", "section_title", "scheme")


class Catalogue:
    """The codified NOGA 2025 entries, indexed for lookup and for checking."""

    def __init__(self, data: dict):
        self.scheme = data.get("scheme") or {}
        self.sections = {
            str(entry["letter"]): str(entry["title"])
            for entry in data.get("sections") or []
            if isinstance(entry, dict) and entry.get("letter")
        }
        self.divisions = {
            str(entry["code"]): entry
            for entry in data.get("divisions") or []
            if isinstance(entry, dict) and entry.get("code")
        }

    @property
    def scheme_name(self) -> str:
        return str(self.scheme.get("name") or "NOGA 2025")

    def code_url(self, code: str) -> str:
        template = self.scheme.get("code_url") or "https://www.kubb-tool.bfs.admin.ch/en/noga/2025/{code}"
        return str(template).replace("{code}", code)

    def search(self, query: str) -> tuple[list[tuple[str, str]], list[dict]]:
        """Sections and divisions whose code or title contains the query."""
        needle = query.casefold()
        sections = [
            (letter, title)
            for letter, title in self.sections.items()
            if needle in letter.casefold() or needle in title.casefold()
        ]
        divisions = [
            entry
            for code, entry in self.divisions.items()
            if needle in code or needle in str(entry.get("title", "")).casefold()
        ]
        return sections, divisions


def load_catalogue(errors: list[str]) -> Catalogue | None:
    if not CATALOGUE_PATH.exists():
        errors.append(f"{CATALOGUE_PATH.name}: missing. It is the codified NOGA 2025 entries")
        return None
    try:
        data = yaml.safe_load(CATALOGUE_PATH.read_text())
    except yaml.YAMLError as exc:
        errors.append(f"{CATALOGUE_PATH.name}: not valid YAML: {exc}")
        return None
    if not isinstance(data, dict):
        errors.append(f"{CATALOGUE_PATH.name}: expected a mapping at the top level")
        return None

    catalogue = Catalogue(data)
    if not catalogue.sections:
        errors.append(f"{CATALOGUE_PATH.name}: `sections` is empty")
        return None

    # The catalogue checks the sectors, so something has to check the catalogue.
    seen: set[str] = set()
    for code, entry in catalogue.divisions.items():
        if not (code.isdigit() and len(code) == 2):
            errors.append(
                f"{CATALOGUE_PATH.name}: division {code!r} must be a quoted two-digit string"
            )
        if code in seen:
            errors.append(f"{CATALOGUE_PATH.name}: division {code} is listed twice")
        seen.add(code)
        if not entry.get("title"):
            errors.append(f"{CATALOGUE_PATH.name}: division {code} has no title")
        section = str(entry.get("section") or "")
        if section not in catalogue.sections:
            errors.append(
                f"{CATALOGUE_PATH.name}: division {code} names section {section!r}, "
                f"which is not in the section list"
            )
    return catalogue


def check_against_catalogue(where: str, noga: dict, catalogue: Catalogue,
                            errors: list[str], notes: list[str]) -> None:
    """Compare a sector's NOGA entry with the codified one."""
    scheme = noga.get("scheme")
    if scheme and str(scheme) != catalogue.scheme_name:
        notes.append(
            f"{where}: `noga.scheme` is {scheme!r} and {CATALOGUE_PATH.name} codifies "
            f"{catalogue.scheme_name}. The checks below use {catalogue.scheme_name}"
        )

    section = noga.get("section")
    if section is not None:
        letter = str(section)
        if letter not in catalogue.sections:
            errors.append(
                f"{where}: `noga.section` is {letter!r}, which is not a {catalogue.scheme_name} "
                f"section. Run `python3 scripts/check-classification.py --noga` for the list"
            )
        else:
            expected = catalogue.sections[letter]
            if noga.get("section_title") and str(noga["section_title"]) != expected:
                errors.append(
                    f"{where}: `noga.section_title` is {noga['section_title']!r}; "
                    f"section {letter} is {expected!r}"
                )

    division = noga.get("division")
    if division is None:
        return
    code = str(division)
    entry = catalogue.divisions.get(code)
    if entry is None:
        notes.append(
            f"{where}: division {code} is not yet in {CATALOGUE_PATH.name}. Read the title from "
            f"{catalogue.code_url(code)} and add the row in this pull request, so the next "
            f"contributor can pick it from the list"
        )
        return

    expected_title = str(entry.get("title"))
    if noga.get("division_title") and str(noga["division_title"]) != expected_title:
        errors.append(
            f"{where}: `noga.division_title` is {noga['division_title']!r}; "
            f"division {code} is {expected_title!r}"
        )
    expected_section = str(entry.get("section"))
    if noga.get("section") and str(noga["section"]) != expected_section:
        errors.append(
            f"{where}: division {code} sits in section {expected_section}, "
            f"and this sector claims section {noga['section']}"
        )


def print_noga(catalogue: Catalogue, query: str | None) -> int:
    """Print the codified entries, or the ones matching a query."""
    if query:
        sections, divisions = catalogue.search(query)
        if not sections and not divisions:
            print(f"Nothing in {CATALOGUE_PATH.name} matches {query!r}.")
            print(f"Look the activity up at {catalogue.scheme.get('lookup')} and add its row.")
            return 1
    else:
        sections = list(catalogue.sections.items())
        divisions = list(catalogue.divisions.values())

    if sections:
        print(f"{catalogue.scheme_name} sections")
        print("-" * 72)
        for letter, title in sections:
            print(f"  {letter}  {title}")
        print()

    if divisions:
        print(f"{catalogue.scheme_name} divisions codified here")
        print("-" * 72)
        for entry in divisions:
            code = str(entry["code"])
            used_by = entry.get("used_by")
            suffix = f"   [claimed by {used_by}/]" if used_by else ""
            print(f"  {code}  {entry.get('title')}   (section {entry.get('section')}){suffix}")
            if entry.get("note"):
                print(f"      {entry['note']}")
        print()

    # One match is an answer rather than a list, so print what goes in the file.
    if query and len(divisions) == 1 and not sections:
        entry = divisions[0]
        letter = str(entry.get("section"))
        print("Paste this into <your-sector>/sector.yaml:")
        print()
        print("noga:")
        print(f'  division: "{entry["code"]}"')
        print(f"  division_title: {entry.get('title')}")
        print(f"  section: {letter}")
        print(f"  section_title: {catalogue.sections.get(letter, '')}")
        print(f"  scheme: {catalogue.scheme_name}")
        print()

    print(f"Source: {catalogue.scheme.get('lookup')}")
    return 0


def sector_dirs() -> list[Path]:
    """Every root directory that looks like a sector.

    A sector is a directory holding a README.md. That is the convention the
    repository already follows. It is what makes a missing sector.yaml
    detectable rather than silently absent.
    """
    found = []
    for path in sorted(ROOT.iterdir()):
        if not path.is_dir() or path.name.startswith(".") or path.name in NOT_SECTORS:
            continue
        if (path / "README.md").exists() or (path / "sector.yaml").exists():
            found.append(path)
    return found


def check_sector(path: Path, catalogue: Catalogue | None, errors: list[str],
                 notes: list[str]) -> dict | None:
    manifest = path / "sector.yaml"
    if not manifest.exists():
        errors.append(
            f"{path.name}/: no sector.yaml. Copy sector.template.yaml and pick the NOGA "
            f"entry with `python3 scripts/check-classification.py --noga <search>`"
        )
        return None

    try:
        data = yaml.safe_load(manifest.read_text())
    except yaml.YAMLError as exc:
        errors.append(f"{manifest}: not valid YAML: {exc}")
        return None

    if not isinstance(data, dict):
        errors.append(f"{manifest}: expected a mapping at the top level")
        return None

    where = f"{path.name}/sector.yaml"

    if data.get("sector") != path.name:
        errors.append(f"{where}: `sector` is {data.get('sector')!r} but the directory is {path.name!r}")
    if not data.get("title"):
        errors.append(f"{where}: `title` is required. It is what the portal shows")

    noga = data.get("noga")
    if data.get("reference_model"):
        if noga is not None:
            errors.append(f"{where}: the reference model is not a sector, so `noga` must be null")
    elif not isinstance(noga, dict):
        errors.append(
            f"{where}: `noga` is required. Pick it with "
            f"`python3 scripts/check-classification.py --noga <search>`"
        )
    else:
        for key in NOGA_KEYS:
            if not noga.get(key):
                errors.append(f"{where}: `noga.{key}` is required")
        division = noga.get("division")
        if division is not None and not (isinstance(division, str) and division.isdigit()):
            errors.append(
                f"{where}: `noga.division` must be a quoted string of digits, for example \"86\". "
                f"Found {division!r}"
            )
        if catalogue is not None:
            check_against_catalogue(where, noga, catalogue, errors, notes)

    families = data.get("families")
    if not isinstance(families, list) or not families:
        errors.append(f"{where}: `families` must be a non-empty list")
        return data

    seen_flow_ids: set[str] = set()
    for index, family in enumerate(families):
        fam_where = f"{where}: families[{index}]"
        if not isinstance(family, dict):
            errors.append(f"{fam_where}: expected a mapping")
            continue
        if not family.get("id"):
            errors.append(f"{fam_where}: `id` is required")
        if not family.get("title"):
            errors.append(f"{fam_where}: `title` is required")

        status = family.get("status")
        if status not in FAMILY_STATUS:
            errors.append(
                f"{fam_where}: `status` is {status!r}; expected one of {sorted(FAMILY_STATUS)}"
            )

        directory = family.get("directory")
        if directory and not (path / directory).exists():
            errors.append(f"{fam_where}: `directory` points at {directory!r}, which does not exist")

        flows = family.get("flows")
        if not isinstance(flows, list) or not flows:
            errors.append(f"{fam_where}: `flows` must be a non-empty list")
            continue

        for flow_index, flow in enumerate(flows):
            flow_where = f"{fam_where}.flows[{flow_index}]"
            if not isinstance(flow, dict):
                errors.append(f"{flow_where}: expected a mapping")
                continue
            flow_id = flow.get("id")
            if not flow_id:
                errors.append(f"{flow_where}: `id` is required")
            elif flow_id in seen_flow_ids:
                errors.append(f"{flow_where}: duplicate flow id {flow_id!r} inside {path.name}/")
            else:
                seen_flow_ids.add(flow_id)
            if not flow.get("title"):
                errors.append(f"{flow_where}: `title` is required")

            flow_status = flow.get("status")
            if flow_status is not None and flow_status not in FLOW_STATUS:
                errors.append(
                    f"{flow_where}: `status` is {flow_status!r}; expected one of {sorted(FLOW_STATUS)}"
                )

            diagram = flow.get("diagram")
            if diagram and not (path / diagram).exists():
                errors.append(f"{flow_where}: `diagram` points at {diagram!r}, which does not exist")

    return data


def main(argv: list[str]) -> int:
    errors: list[str] = []
    notes: list[str] = []
    manifests: dict[str, dict] = {}

    catalogue = load_catalogue(errors)

    if argv and argv[0] == "--noga":
        if catalogue is None:
            for error in errors:
                print(f"  - {error}")
            return 1
        return print_noga(catalogue, argv[1] if len(argv) > 1 else None)
    if argv:
        print(f"Unknown argument {argv[0]!r}. Usage: check-classification.py [--noga [search]]")
        return 1

    sectors = sector_dirs()
    if not sectors:
        print("No sector directories found. Is this the repository root?")
        return 1

    for path in sectors:
        data = check_sector(path, catalogue, errors, notes)
        if data:
            manifests[path.name] = data

    # One division, one directory. This is the rule that stops "banking",
    # "finance" and "financial services" becoming three sectors.
    by_division: dict[str, list[str]] = {}
    for name, data in manifests.items():
        noga = data.get("noga")
        if isinstance(noga, dict) and noga.get("division"):
            by_division.setdefault(str(noga["division"]), []).append(name)
    for division, names in sorted(by_division.items()):
        if len(names) > 1:
            errors.append(
                f"NOGA division {division} is claimed by {', '.join(sorted(names))}. "
                f"One division, one directory"
            )

    print(f"{'Sector':<16} {'Division':<10} {'Families':<10} Flows")
    print("-" * 52)
    total_flows = 0
    for name in sorted(manifests):
        data = manifests[name]
        noga = data.get("noga")
        division = str(noga["division"]) if isinstance(noga, dict) and noga.get("division") else "reference"
        families = data.get("families") or []
        flows = sum(len(f.get("flows") or []) for f in families if isinstance(f, dict))
        total_flows += flows
        print(f"{name:<16} {division:<10} {len(families):<10} {flows}")
    print("-" * 52)
    print(f"{len(manifests)} sectors, {total_flows} flows")

    if notes:
        print()
        print(f"{len(notes)} note(s):")
        for note in notes:
            print(f"  - {note}")

    if errors:
        print()
        print(f"{len(errors)} problem(s):")
        for error in errors:
            print(f"  - {error}")
        return 1

    print()
    print("Classification is coherent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
