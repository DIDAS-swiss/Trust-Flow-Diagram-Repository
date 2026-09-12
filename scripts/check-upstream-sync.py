#!/usr/bin/env python3
"""Check the synced catalogues still match industry-function-graph.

`functions.yaml`, `value-streams.yaml` and `states.yaml` are local copies of
vocabularies maintained in DIDAS-swiss/industry-function-graph. Copies drift.
Nothing else in this repository would notice, because the local check only ever
compares sector.yaml files against the local copies - which is exactly how two
repositories end up quietly disagreeing about what `identity-proofing` means.

    python3 scripts/check-upstream-sync.py
    python3 scripts/check-upstream-sync.py --source path/or/url   # for testing

It reads the published graph rather than the upstream repository, so it depends
on a URL that is meant to be stable rather than on a checkout.

Exit codes: 0 in sync, or upstream unreachable. 1 when it is reachable and the
copies disagree. Being offline is not a contributor's fault, so it is reported
and passed; drift is.
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML is required: pip install pyyaml")

ROOT = Path(__file__).resolve().parent.parent
UPSTREAM = "https://didas-swiss.github.io/industry-function-graph/ifm-graph.jsonld"
REPO = "https://github.com/DIDAS-swiss/industry-function-graph"

# local file, the key holding its entries, and the id prefix upstream uses
CATALOGUES = [
    ("functions.yaml", "functions", "func"),
    ("value-streams.yaml", "streams", "stream"),
    ("states.yaml", "states", "state"),
]
TIMEOUT_SECONDS = 20


def fetch(source: str) -> dict | None:
    """The published graph, or None if it cannot be reached."""
    if not source.startswith(("http://", "https://")):
        return json.loads(Path(source).read_text())
    try:
        with urllib.request.urlopen(source, timeout=TIMEOUT_SECONDS) as response:
            return json.loads(response.read().decode())
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        print(f"Could not read {source}: {exc}")
        print("Treating this as unreachable rather than as drift, and passing.")
        return None


def upstream_entries(graph: dict, prefix: str) -> dict[str, str]:
    """{id: english prefLabel} for one prefix of the published graph."""
    found = {}
    for node in graph.get("@graph", []):
        ident = str(node.get("@id", ""))
        if not ident.startswith(f"{prefix}:"):
            continue
        label = node.get("skos:prefLabel")
        if isinstance(label, dict):
            label = label.get("@value")
        elif isinstance(label, list):
            label = next((item.get("@value") for item in label
                          if isinstance(item, dict)), None)
        found[ident.split(":", 1)[1]] = str(label or "")
    return found


def local_entries(filename: str, key: str) -> dict[str, str]:
    data = yaml.safe_load((ROOT / filename).read_text()) or {}
    return {
        str(entry["id"]): str(entry.get("title") or "")
        for entry in data.get(key) or []
        if isinstance(entry, dict) and entry.get("id")
    }


def compare(filename: str, local: dict[str, str], upstream: dict[str, str]) -> list[str]:
    problems = []
    for ident in sorted(set(upstream) - set(local)):
        problems.append(
            f"{filename}: {ident!r} exists upstream and not here. Copy its row across")
    for ident in sorted(set(local) - set(upstream)):
        problems.append(
            f"{filename}: {ident!r} exists here and not upstream. Either it was removed "
            f"there, or it was added here and belongs upstream first")
    for ident in sorted(set(local) & set(upstream)):
        if local[ident] != upstream[ident] and upstream[ident]:
            problems.append(
                f"{filename}: {ident!r} is titled {local[ident]!r} here and "
                f"{upstream[ident]!r} upstream")
    return problems


def main(argv: list[str]) -> int:
    source = UPSTREAM
    if argv and argv[0] == "--source" and len(argv) > 1:
        source = argv[1]
    elif argv:
        print("Usage: check-upstream-sync.py [--source <path-or-url>]")
        return 1

    graph = fetch(source)
    if graph is None:
        return 0

    problems = []
    for filename, key, prefix in CATALOGUES:
        if not (ROOT / filename).exists():
            problems.append(f"{filename}: missing")
            continue
        local = local_entries(filename, key)
        upstream = upstream_entries(graph, prefix)
        if not upstream:
            problems.append(
                f"{filename}: nothing with the {prefix!r} prefix in the published graph. "
                f"Either the upstream namespace changed or this check is out of date")
            continue
        print(f"{filename:<22} {len(local):>3} local, {len(upstream):>3} upstream")
        problems += compare(filename, local, upstream)

    if problems:
        print()
        print(f"{len(problems)} difference(s) from {REPO}:")
        for problem in problems:
            print(f"  - {problem}")
        print()
        print("Sync the copies, or change it upstream first and then sync.")
        return 1

    print()
    print("Synced catalogues match the published graph.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
