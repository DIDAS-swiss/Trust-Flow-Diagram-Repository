# How flows are classified

This repository already sorts flows by sector: `banking/`, `education/`, and
`basic-flow/` for the reference model. That convention works and is kept. What
follows writes it down, gives the sector names a source outside this repository,
and adds a small metadata file per sector so the classification can be read by
something other than a person looking at a directory listing.

Nothing moves. No existing flow is renamed.

## The two levels

```
<sector>/                        e.g. banking/, education/, health/
  <use-case-family>/             e.g. KYC Credential/
    <flow>.svg | <flow>.likec4   the diagram itself
    README.md
```

**Sector** is the industry the relying party operates in. **Use-case family**
groups flows that share a trigger and a set of actors — KYC onboarding and
re-KYC belong together; issuing a school certificate and matriculating at a
university do not.

A sector with one family may keep its flows directly under the sector
directory, as `education/` does today. The second level is there when it earns
its place.

## Sector names come from NOGA

Sector names are taken from [NOGA
2025](https://www.kubb-tool.bfs.admin.ch/en), the Federal Statistical Office's
General Classification of Economic Activities. NOGA is the Swiss
implementation of the European NACE Rev. 2.1, which derives from the UN's ISIC
Rev. 5, so a sector named here is a sector a Swiss authority, an EU body and a
UN statistical office all recognise.

The reason to anchor to a published classification is narrow and practical.
"Banking", "finance", "fintech" and "financial services" are four names for one
sector, and a repository that accumulates flows from many contributors will
acquire all four unless the naming has a source. NOGA is that source, it is
free, and the Federal Statistical Office maintains it.

**Key on the division number, not the section letter.** The letters are not
stable across revisions: between NACE Rev. 2 and NOGA 2025, finance moved from
K to L, education from P to Q, and human health from Q to R. The division
numbers — 64, 85, 86 — did not move. A classification keyed on letters would
have been wrong within a year of being written.

| Directory | NOGA 2025 division | Section |
| --- | --- | --- |
| `banking/` | 64 — Financial service activities, except insurance and pension funding | L, Financial and insurance activities |
| `education/` | 85 — Education | Q, Education |
| `health/` | 86 — Human health activities | R, Human health and social work activities |
| `basic-flow/` | none — it is the reference model, not a sector | — |

A directory name stays short and readable. `health/`, not `human-health-activities/`.
The NOGA code lives in the metadata below, where precision belongs.

## `sector.yaml`

One file per sector directory, so the classification is machine-readable and
the portal can eventually be generated from it instead of hand-maintained.

```yaml
# health/sector.yaml
sector: health
title: Health
noga:
  division: "86"
  division_title: Human health activities
  section: R
  section_title: Human health and social work activities
  scheme: NOGA 2025
families:
  - id: immunization
    title: Immunization and vaccination records
    status: in-progress
    flows:
      - id: F-01
        title: Becoming an actor in the health trust domain
```

| Field | Meaning |
| --- | --- |
| `sector` | Directory name |
| `title` | What the portal shows |
| `noga` | The classification entry, with the scheme version that was read |
| `families[]` | Use-case families, each with its flows |
| `status` | `in-progress`, `stable`, or `draft` — the portal already shows this |

Kept deliberately small. A schema nobody fills in is worse than a convention
nobody wrote down.

## Adding a sector

1. Look the activity up in [KUBB](https://www.kubb-tool.bfs.admin.ch/en) and
   take the **division**.
2. Create `<sector>/` with a short directory name and a `sector.yaml`.
3. Add a `README.md` naming the flows and their contributors, as `banking/` and
   `education/` do.
4. Add the sector to the portal — see `index.html`.

If two contributors reach for the same sector under different names, the
division number settles it: one division, one directory.

## What this does not classify

Flows are also distinguished by **trust role** — who issues, who verifies, who
holds — and by the **protocols** they exercise. Neither is captured here.
Sector and use-case family answer "where does this belong in the repository",
which is the question a contributor asks first and a reader asks second. A
second axis can be added when there are enough flows for it to pay for itself.
