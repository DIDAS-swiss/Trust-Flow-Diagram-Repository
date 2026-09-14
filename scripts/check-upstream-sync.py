#!/usr/bin/env python3
"""Check the synced catalogues still match industry-function-graph.

`functions.yaml`, `value-streams.yaml` and `conditions.yaml` are local copies of
vocabularies maintained in DIDAS-swiss/industry-function-graph.

`conditions.yaml` was `states.yaml` and was not compared, on the ground that the
interface vocabulary was this repository's own. Upstream now publishes a typed
condition scheme with a broader-than lattice, so the ground is gone and the copy
is checked like the other two.

Copies drift. Nothing else in this repository would notice, because the local
check only ever compares sector.yaml files against the local copies - which is
exactly how two repositories end up quietly disagreeing about what
`identity-proofing` means.

Every copied field is compared, not just the id and the title. An earlier
version compared ids and titles only, and a renamed function passed CI with its
id and title updated by hand and its definition left behind.

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

# The fields copied from upstream into the local YAML, and where each comes from
# in the published graph. Comparing only ids and titles is what let a stale
# `relationship-onboarding` definition sit in the copy while CI stayed green:
# the id and the title had been updated by hand and the definition had not.
SKOS_FIELDS = [("title", "skos:prefLabel"), ("definition", "skos:definition"),
               ("broader", "skos:broader")]

# A condition carries two more. `kind` is read from the node's rdf:type rather
# than a property, and it is load-bearing: the local checker refuses a lattice
# edge between two kinds, so a kind edited here and not upstream would change
# what composes.
CONDITION_FIELDS = SKOS_FIELDS + [("kind", "@type"),
                                  ("substantiated_by", "ifm:substantiatedBy")]

# The rdf:type upstream gives each kind of condition.
CONDITION_TYPES = {
    "ifm:EvidenceCondition": "evidence",
    "ifm:FactCondition": "fact",
    "ifm:RelationshipCondition": "relationship",
    "ifm:OutcomeCondition": "outcome",
}

# local file, the key holding its entries, the id prefix upstream uses, and the
# fields compared.
CATALOGUES = [
    ("functions.yaml", "functions", "func", SKOS_FIELDS),
    ("value-streams.yaml", "streams", "stream", SKOS_FIELDS),
    ("conditions.yaml", "conditions", "cond", CONDITION_FIELDS),
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


def _value(node: dict, key: str) -> str:
    """One scalar out of a JSON-LD node, whatever shape it is published in."""
    if key == "@type":
        types = node.get("@type") or []
        types = [types] if isinstance(types, str) else types
        return next((CONDITION_TYPES[t] for t in types if t in CONDITION_TYPES), "")
    raw = node.get(key)
    if isinstance(raw, list):
        raw = next((item for item in raw if isinstance(item, (dict, str))), None)
    if isinstance(raw, dict):
        raw = raw.get("@value") or raw.get("@id") or ""
    text = str(raw or "")
    # An id reference is published prefixed; the local copy holds the bare one.
    if key in ("skos:broader", "ifm:substantiatedBy") and ":" in text:
        return text.split(":", 1)[1]
    return text


def upstream_entries(graph: dict, prefix: str, fields) -> dict[str, dict[str, str]]:
    """{id: {field: value}} for one prefix of the published graph."""
    found = {}
    for node in graph.get("@graph", []):
        ident = str(node.get("@id", ""))
        if not ident.startswith(f"{prefix}:"):
            continue
        found[ident.split(":", 1)[1]] = {
            field: _value(node, source) for field, source in fields
        }
    return found


def local_entries(filename: str, key: str, fields) -> dict[str, dict[str, str]]:
    data = yaml.safe_load((ROOT / filename).read_text()) or {}
    return {
        str(entry["id"]): {field: str(entry.get(field) or "").strip()
                           for field, _ in fields}
        for entry in data.get(key) or []
        if isinstance(entry, dict) and entry.get("id")
    }


def compare(filename: str, local: dict[str, dict[str, str]],
            upstream: dict[str, dict[str, str]], fields) -> list[str]:
    problems = []
    for ident in sorted(set(upstream) - set(local)):
        problems.append(
            f"{filename}: {ident!r} exists upstream and not here. Copy its row across")
    for ident in sorted(set(local) - set(upstream)):
        problems.append(
            f"{filename}: {ident!r} exists here and not upstream. Either it was removed "
            f"there, or it was added here and belongs upstream first")
    for ident in sorted(set(local) & set(upstream)):
        for field, _ in fields:
            here, there = local[ident][field], upstream[ident][field].strip()
            # An upstream field that is absent is not drift: not every entry has
            # a broader concept. A local value where upstream has none is.
            if here == there or (not there and not here):
                continue
            if not there:
                problems.append(
                    f"{filename}: {ident!r} has {field} {here!r} here and none upstream")
            else:
                problems.append(
                    f"{filename}: {ident!r} {field} differs.\n"
                    f"      here:     {here!r}\n"
                    f"      upstream: {there!r}")
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
    for filename, key, prefix, fields in CATALOGUES:
        if not (ROOT / filename).exists():
            problems.append(f"{filename}: missing")
            continue
        local = local_entries(filename, key, fields)
        upstream = upstream_entries(graph, prefix, fields)
        if not upstream:
            problems.append(
                f"{filename}: nothing with the {prefix!r} prefix in the published graph. "
                f"Either the upstream namespace changed or this check is out of date")
            continue
        print(f"{filename:<22} {len(local):>3} local, {len(upstream):>3} upstream")
        problems += compare(filename, local, upstream, fields)

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
