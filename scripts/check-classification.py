#!/usr/bin/env python3
"""Check that every sector is classified and that the classification is coherent.

A convention nobody checks drifts. This runs in CI and locally:

    python3 scripts/check-classification.py

It answers six questions a reviewer would otherwise have to answer by hand.
Does every sector directory carry a sector.yaml? Does every sector.yaml carry a
NOGA division, unless it is the reference model? Does the classification it
carries match the codified NOGA entry in noga-2025.yaml? Do two sectors claim
the same division? Does every family name functions that exist in
functions.yaml? Does every file a sector.yaml points at actually exist?

It also looks codes up, so that adding a sector does not mean transcribing a
classification by hand:

    python3 scripts/check-classification.py --noga            # the whole list
    python3 scripts/check-classification.py --noga health     # search
    python3 scripts/check-classification.py --noga 86         # one division
    python3 scripts/check-classification.py --functions       # the whole list
    python3 scripts/check-classification.py --functions kyc   # search

And it writes the file for you, so a new sector starts from something valid:

    python3 scripts/check-classification.py --new retail      # a stub
    python3 scripts/check-classification.py --new retail 47   # with the division filled in

The pickable version of all this is the "Propose a new flow" issue form, whose
dropdowns are generated from the same two catalogues so they cannot drift:

    python3 scripts/check-classification.py --issue-form

Exit code 0 means the classification is coherent. Exit code 1 lists what is not.
"""

from __future__ import annotations

import json
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

# The codified business functions. The second axis: a sector says which
# industry, a function says what kind of work.
FUNCTIONS_PATH = ROOT / "functions.yaml"

# The issue form is generated from the two catalogues above, so its dropdowns
# cannot drift from what the checker will accept. The default run fails if it
# is stale, the way it fails on any other incoherence.
ISSUE_FORM_PATH = ROOT / ".github" / "ISSUE_TEMPLATE" / "new-flow.yml"

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


class Functions:
    """The codified business functions, indexed for lookup and for checking."""

    def __init__(self, data: dict):
        self.scheme = data.get("scheme") or {}
        self.entries = {
            str(entry["id"]): entry
            for entry in data.get("functions") or []
            if isinstance(entry, dict) and entry.get("id")
        }

    @property
    def scheme_name(self) -> str:
        return str(self.scheme.get("name") or "IFM business functions")

    def search(self, query: str) -> list[dict]:
        needle = query.casefold()
        return [
            entry
            for key, entry in self.entries.items()
            if needle in key.casefold()
            or needle in str(entry.get("title", "")).casefold()
            or needle in str(entry.get("definition", "")).casefold()
        ]


def load_functions(errors: list[str]) -> Functions | None:
    if not FUNCTIONS_PATH.exists():
        errors.append(f"{FUNCTIONS_PATH.name}: missing. It is the codified business functions")
        return None
    try:
        data = yaml.safe_load(FUNCTIONS_PATH.read_text())
    except yaml.YAMLError as exc:
        errors.append(f"{FUNCTIONS_PATH.name}: not valid YAML: {exc}")
        return None
    if not isinstance(data, dict):
        errors.append(f"{FUNCTIONS_PATH.name}: expected a mapping at the top level")
        return None

    functions = Functions(data)
    if not functions.entries:
        errors.append(f"{FUNCTIONS_PATH.name}: `functions` is empty")
        return None

    # The catalogue checks the sectors, so something has to check the catalogue.
    for key, entry in functions.entries.items():
        if not entry.get("title"):
            errors.append(f"{FUNCTIONS_PATH.name}: function {key} has no title")
        if not entry.get("definition"):
            errors.append(
                f"{FUNCTIONS_PATH.name}: function {key} has no definition. A function "
                f"nobody can define will be used to mean two things"
            )
        broader = entry.get("broader")
        if broader and str(broader) not in functions.entries:
            errors.append(
                f"{FUNCTIONS_PATH.name}: function {key} names broader {broader!r}, "
                f"which is not in the list"
            )
    return functions


def check_functions_block(where: str, family: dict, functions: Functions | None,
                          errors: list[str], notes: list[str]) -> bool:
    """Check a family's `functions` block. Absence is a note, not an error.

    Adoption is gradual - the same treatment an uncodified NOGA division gets.
    A function that does not exist is another matter: it is a typo or an
    invention, and both are worth failing for.
    """
    block = family.get("functions")
    if block is None:
        notes.append(
            f"{where}: no `functions` block. Pick one with "
            f"`python3 scripts/check-classification.py --functions <search>`"
        )
        return False
    if not isinstance(block, dict):
        errors.append(f"{where}: `functions` must be a mapping with `primary` and `supporting`")
        return False

    primary = block.get("primary")
    if not primary:
        errors.append(f"{where}: `functions.primary` is required. A family does one thing first")
    supporting = block.get("supporting") or []
    if not isinstance(supporting, list):
        errors.append(f"{where}: `functions.supporting` must be a list")
        supporting = []

    if functions is None:
        return True

    for role, value in [("primary", primary)] + [("supporting", item) for item in supporting]:
        if value and str(value) not in functions.entries:
            errors.append(
                f"{where}: `functions.{role}` is {value!r}, which is not in "
                f"{FUNCTIONS_PATH.name}. Run "
                f"`python3 scripts/check-classification.py --functions` for the list, "
                f"and add the row in this pull request if it is genuinely missing"
            )
    if primary and str(primary) in [str(item) for item in supporting]:
        errors.append(
            f"{where}: {primary!r} is both the primary and a supporting function"
        )
    seen: set[str] = set()
    for item in supporting:
        if str(item) in seen:
            errors.append(f"{where}: supporting function {item!r} is listed twice")
        seen.add(str(item))
    return True


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


def print_functions(functions: Functions, query: str | None) -> int:
    """Print the codified functions, or the ones matching a query."""
    entries = functions.search(query) if query else list(functions.entries.values())
    if not entries:
        print(f"Nothing in {FUNCTIONS_PATH.name} matches {query!r}.")
        print(f"The upstream scheme is {functions.scheme.get('source')}.")
        return 1

    print(f"{functions.scheme_name}")
    print("-" * 72)
    for entry in entries:
        key = str(entry["id"])
        under = f"   (under {entry['broader']})" if entry.get("broader") else ""
        print(f"  {key:<32}{entry.get('title')}{under}")
        definition = " ".join(str(entry.get("definition", "")).split())
        if definition:
            print(f"      {definition}")
    print()

    # One match is an answer rather than a list, so print what goes in the file.
    if query and len(entries) == 1:
        print("Paste this into the family in <your-sector>/sector.yaml:")
        print()
        print("    functions:")
        print(f"      primary: {entries[0]['id']}")
        print("      supporting: []")
        print()

    print(f"Source: {functions.scheme.get('source')}")
    return 0


def scaffold(name: str, division: str | None, catalogue: Catalogue | None) -> int:
    """Write a sector.yaml that is already valid, so a contributor edits rather
    than authors. Everything the checker can fill in, it fills in."""
    if not name or not name.replace("-", "").isalnum():
        print(f"{name!r} is not a directory name. Use the sector directory, for example `retail`.")
        return 1

    noga_block = [
        '  division: "00"             # quoted, because leading zeros matter',
        "  division_title: ...        # run --noga <search> and paste what it prints",
        "  section: X",
        "  section_title: ...",
        "  scheme: NOGA 2025",
    ]
    if division and catalogue is not None:
        entry = catalogue.divisions.get(str(division))
        if entry is None:
            print(f"Division {division} is not in {CATALOGUE_PATH.name}.")
            print(f"Read its title from {catalogue.code_url(str(division))} and add the row,")
            print("or run `--noga <search>` to find the right one.")
            return 1
        letter = str(entry.get("section"))
        noga_block = [
            f'  division: "{entry["code"]}"',
            f"  division_title: {entry.get('title')}",
            f"  section: {letter}",
            f"  section_title: {catalogue.sections.get(letter, '')}",
            f"  scheme: {catalogue.scheme_name}",
        ]

    body = "\n".join([
        f"sector: {name}",
        f"title: {name.replace('-', ' ').title()}",
        "noga:",
        *noga_block,
        "families:",
        "  - id: example-family       # kebab-case, stable, referenced from elsewhere",
        "    title: Example family",
        "    status: draft            # draft | specified | in-progress | stable",
        "    functions:",
        "      primary: ...           # run --functions <search> and paste what it prints",
        "      supporting: []",
        "    flows:",
        "      - id: F-01",
        "        title: What this flow shows",
        "        status: draft",
        "",
    ])

    target = ROOT / name / "sector.yaml"
    if target.exists():
        print(f"{target.relative_to(ROOT)} already exists. Not overwriting it. Here is the shape:")
        print()
        print(body)
        return 1
    if not target.parent.exists():
        print(f"{name}/ does not exist yet, so here is the file to put in it:")
        print()
        print(body)
        return 0

    target.write_text(body)
    print(f"Wrote {target.relative_to(ROOT)}.")
    print()
    print("Next:")
    if not (division and catalogue is not None):
        print("  1. python3 scripts/check-classification.py --noga <search>      pick the division")
        print("  2. python3 scripts/check-classification.py --functions <search> pick the functions")
        print("  3. python3 scripts/check-classification.py                      check it")
    else:
        print("  1. python3 scripts/check-classification.py --functions <search> pick the functions")
        print("  2. python3 scripts/check-classification.py                      check it")
    return 0


def render_issue_form(catalogue: Catalogue, functions: Functions,
                      manifests: dict[str, dict]) -> str:
    """Build the "Propose a new flow" issue form from the codified entries.

    GitHub renders dropdowns in issue forms but not in pull request templates,
    and a dropdown's options are fixed when the file is written. Generating the
    file is what keeps those fixed options honest: add a division or a function
    and the form follows, or the check fails.
    """
    def q(value: str) -> str:
        return json.dumps(str(value), ensure_ascii=False)

    sectors = []
    for name in sorted(manifests):
        data = manifests[name]
        if data.get("reference_model"):
            continue
        noga = data.get("noga") or {}
        sectors.append(f"{name} — {data.get('title')} (division {noga.get('division')})")
    sectors.append("a new sector — not listed above")

    divisions = []
    for code in sorted(catalogue.divisions):
        entry = catalogue.divisions[code]
        claimed = f" — already {entry['used_by']}/" if entry.get("used_by") else ""
        divisions.append(
            f"{code} — {entry.get('title')} (section {entry.get('section')}){claimed}"
        )
    divisions.append("not listed — I will add the row to noga-2025.yaml")

    families = []
    for name in sorted(manifests):
        for family in manifests[name].get("families") or []:
            if isinstance(family, dict) and family.get("id"):
                families.append(f"{name}/{family['id']} — {family.get('title')}")
    families.append("a new family — described below")

    function_options = [
        f"{key} — {entry.get('title')}" for key, entry in functions.entries.items()
    ]

    def dropdown(ident: str, label: str, description: str, options: list[str]) -> list[str]:
        block = [
            "  - type: dropdown",
            f"    id: {ident}",
            "    attributes:",
            f"      label: {q(label)}",
            f"      description: {q(description)}",
            "      options:",
        ]
        block += [f"        - {q(option)}" for option in options]
        block += ["    validations:", "      required: true"]
        return block

    lines = [
        "# DO NOT EDIT. Generated by scripts/check-classification.py from",
        "# noga-2025.yaml, functions.yaml and the sector.yaml files.",
        "# Regenerate with: python3 scripts/check-classification.py --issue-form",
        "#",
        "# GitHub renders dropdowns in issue forms and not in pull request",
        "# templates, so the pickable version of the classification lives here.",
        "",
        'name: Propose a new flow',
        'description: Classify a trust flow before writing it, so the sector and the function are settled while it is fresh.',
        'title: "[flow] "',
        "body:",
        "  - type: markdown",
        "    attributes:",
        f"      value: {q('Every field below is a choice from the codified lists. If what you need is missing, pick the *not listed* option and add the row in the pull request — that is the intended way to extend either catalogue, not a workaround.')}",
    ]
    lines += dropdown(
        "sector", "Sector directory",
        "The industry the relying party operates in, not the industry of whoever wrote the flow. A bank verifying a school certificate is a banking flow.",
        sectors)
    lines += dropdown(
        "division", "NOGA division",
        "Identical to the ISIC Rev. 5 division. Key on this number rather than the section letter: letters move between revisions, numbers do not.",
        divisions)
    lines += dropdown(
        "family", "Family",
        "A family groups flows that share a trigger and a set of actors. Pick the one this joins, or say it starts a new one.",
        families)
    lines += dropdown(
        "function", "Primary function",
        "What kind of work this is, independent of the sector. The one thing the family exists to do; supporting functions go in sector.yaml.",
        function_options)
    lines += [
        "  - type: textarea",
        "    id: summary",
        "    attributes:",
        f"      label: {q('What the flow shows')}",
        f"      description: {q('A sentence or two. Who exchanges what with whom, and where the trust decision happens.')}",
        "    validations:",
        "      required: true",
        "  - type: textarea",
        "    id: uncertainty",
        "    attributes:",
        f"      label: {q('Anything you are unsure about')}",
        f"      description: {q('Uncertain about the division or the function? Say so rather than guessing quietly. Picking the wrong one is cheap to fix now and expensive once other flows have copied it.')}",
        "  - type: checkboxes",
        "    id: acknowledgements",
        "    attributes:",
        f"      label: {q('Before submitting')}",
        "      options:",
        f"        - label: {q('I ran python3 scripts/check-classification.py, or this flow has no sector.yaml change yet')}",
        "",
    ]
    return "\n".join(lines)


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


def check_sector(path: Path, catalogue: Catalogue | None, functions: Functions | None,
                 errors: list[str], notes: list[str]) -> dict | None:
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

        # The reference model is not a sector, so it does not do sector work.
        if not data.get("reference_model"):
            check_functions_block(fam_where, family, functions, errors, notes)

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
    functions = load_functions(errors)

    if argv and argv[0] == "--noga":
        if catalogue is None:
            for error in errors:
                print(f"  - {error}")
            return 1
        return print_noga(catalogue, argv[1] if len(argv) > 1 else None)
    if argv and argv[0] == "--functions":
        if functions is None:
            for error in errors:
                print(f"  - {error}")
            return 1
        return print_functions(functions, argv[1] if len(argv) > 1 else None)
    if argv and argv[0] == "--issue-form":
        if catalogue is None or functions is None:
            for error in errors:
                print(f"  - {error}")
            return 1
        scratch: list[str] = []
        manifests = {}
        for path in sector_dirs():
            data = check_sector(path, catalogue, functions, scratch, scratch)
            if data:
                manifests[path.name] = data
        ISSUE_FORM_PATH.parent.mkdir(parents=True, exist_ok=True)
        ISSUE_FORM_PATH.write_text(render_issue_form(catalogue, functions, manifests))
        print(f"Wrote {ISSUE_FORM_PATH.relative_to(ROOT)}.")
        return 0
    if argv and argv[0] == "--new":
        if len(argv) < 2:
            print("Usage: check-classification.py --new <sector> [division]")
            return 1
        return scaffold(argv[1], argv[2] if len(argv) > 2 else None, catalogue)
    if argv:
        print(
            f"Unknown argument {argv[0]!r}. Usage: check-classification.py "
            f"[--noga [search] | --functions [search] | --new <sector> [division] "
            f"| --issue-form]"
        )
        return 1

    sectors = sector_dirs()
    if not sectors:
        print("No sector directories found. Is this the repository root?")
        return 1

    for path in sectors:
        data = check_sector(path, catalogue, functions, errors, notes)
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

    # The issue form's dropdowns are fixed when the file is written, so the only
    # thing keeping them honest is regenerating it whenever a catalogue changes.
    if catalogue is not None and functions is not None:
        expected = render_issue_form(catalogue, functions, manifests)
        if not ISSUE_FORM_PATH.exists():
            errors.append(
                f"{ISSUE_FORM_PATH.relative_to(ROOT)}: missing. Generate it with "
                f"`python3 scripts/check-classification.py --issue-form`"
            )
        elif ISSUE_FORM_PATH.read_text() != expected:
            errors.append(
                f"{ISSUE_FORM_PATH.relative_to(ROOT)}: out of date - its dropdowns no "
                f"longer match the codified entries. Regenerate it with "
                f"`python3 scripts/check-classification.py --issue-form`"
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
    classified = 0
    total_families = 0
    for name, data in manifests.items():
        if data.get("reference_model"):
            continue
        for family in data.get("families") or []:
            if not isinstance(family, dict):
                continue
            total_families += 1
            if isinstance(family.get("functions"), dict):
                classified += 1
    print(
        f"{len(manifests)} sectors, {total_flows} flows, "
        f"{classified}/{total_families} families carry a function"
    )

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
