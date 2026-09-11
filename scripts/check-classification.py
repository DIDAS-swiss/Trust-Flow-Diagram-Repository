#!/usr/bin/env python3
"""Check that every sector is classified and that the classification is coherent.

A convention nobody checks drifts. This runs in CI and locally:

    python3 scripts/check-classification.py

It answers four questions a reviewer would otherwise have to answer by hand.
Does every sector directory carry a sector.yaml? Does every sector.yaml carry a
NOGA division, unless it is the reference model? Do two sectors claim the same
division? Does every file a sector.yaml points at actually exist?

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

# Directories at the repository root that are not sectors.
NOT_SECTORS = {".git", ".github", "assets", "scripts", "node_modules"}

# A family is a body of work. A flow is one exchange inside it. They move at
# different speeds, so they have different vocabularies.
FAMILY_STATUS = {"draft", "specified", "in-progress", "stable"}
FLOW_STATUS = {"draft", "specified", "roadmap", "partial", "implemented", "in-progress", "stable"}

NOGA_KEYS = ("division", "division_title", "section", "section_title", "scheme")


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


def check_sector(path: Path, errors: list[str]) -> dict | None:
    manifest = path / "sector.yaml"
    if not manifest.exists():
        errors.append(
            f"{path.name}/: no sector.yaml. Copy sector.template.yaml and fill in the "
            f"NOGA division from https://www.kubb-tool.bfs.admin.ch/en"
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
        errors.append(f"{where}: `noga` is required. Look the activity up in KUBB and take the division")
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


def main() -> int:
    errors: list[str] = []
    manifests: dict[str, dict] = {}

    sectors = sector_dirs()
    if not sectors:
        print("No sector directories found. Is this the repository root?")
        return 1

    for path in sectors:
        data = check_sector(path, errors)
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
    raise SystemExit(main())
