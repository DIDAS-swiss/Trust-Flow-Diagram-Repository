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

**Sector** is the industry the relying party operates in. **Use case family**
groups flows that share a trigger and a set of actors. KYC onboarding and re-KYC
belong together. Issuing a school certificate and matriculating at a university
do not.

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
sector. A repository that accumulates flows from many contributors will
acquire all four unless the naming has a source. NOGA is that source, it is free
and the Federal Statistical Office maintains it.

**Key on the division number, not the section letter.** The letters are not
stable across revisions. Between NACE Rev. 2 and NOGA 2025, finance moved from K
to L, education from P to Q and human health from Q to R. The division numbers,
64, 85 and 86, did not move. A classification keyed on letters would have been
wrong within a year of being written.

| Directory | NOGA 2025 division | Section |
| --- | --- | --- |
| `banking/` | 64, Financial service activities, except insurance and pension funding | L, Financial and insurance activities |
| `education/` | 85, Education | Q, Education |
| `health/` | 86, Human health activities | R, Human health and social work activities |
| `basic-flow/` | none, because it is the reference model rather than a sector | n/a |

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
| `status` | Where the work has got to. The vocabulary is below |

Kept deliberately small. A schema nobody fills in is worse than a convention
nobody wrote down.

## Adding a flow

Most contributions add a flow to a sector that already exists. That is three
questions and one file.

1. **Which sector?** The industry the *relying party* operates in, not the
   industry of whoever wrote the flow. A bank verifying a school certificate is
   a banking flow.
2. **Which family?** Does it share a trigger and a set of actors with a family
   that is already there? If yes, add it to that family's `flows:` list. If no,
   add a family. A family is cheap. Getting one wrong is not.
3. **What state is it in?** Pick a status from the vocabulary below and be
   honest. `roadmap` is a useful answer.

Then add four lines to `<sector>/sector.yaml` and run the check:

```yaml
      - id: F-12
        title: What this flow shows
        status: roadmap
        diagram: diagrams/F-12-example.png   # optional
```

```bash
python3 scripts/check-classification.py
```

## Adding a sector

1. Look the activity up in [KUBB](https://www.kubb-tool.bfs.admin.ch/en) and
   take the **division**.
2. Create `<sector>/` with a short directory name and copy
   [`sector.template.yaml`](sector.template.yaml) into it as `sector.yaml`.
3. Add a `README.md` naming the flows and their contributors, as `banking/` and
   `education/` do.
4. Add a card to the portal in `index.html`, with the division beside the sector
   name as the existing cards have.
5. Run `python3 scripts/check-classification.py`.

If two contributors reach for the same sector under different names, the
division number settles it: one division, one directory. The check enforces
that.

## Status vocabulary

Families and flows move at different speeds, so they use different words.

| Level | Allowed values |
| --- | --- |
| Family | `draft`, `specified`, `in-progress`, `stable` |
| Flow | `draft`, `specified`, `roadmap`, `partial`, `implemented`, `in-progress`, `stable` |

A flow is `partial` when the happy path exists and named gaps do not. It is
`roadmap` when it is specified deliberately and built deliberately later. The
difference matters to a reader deciding whether to depend on it.

## What the check enforces

[`scripts/check-classification.py`](scripts/check-classification.py) runs in CI
on every pull request that touches a sector. It runs locally in under a second.
It fails on:

- a sector directory with no `sector.yaml`
- a missing or malformed NOGA entry, unless the sector is the reference model
- a `division` that is not a quoted string of digits, because `"08"` and `8` are
  different divisions
- two sectors claiming the same division
- a family or flow status outside the vocabulary above
- a duplicate flow id inside one sector
- a `directory:` or `diagram:` that points at a file that is not there

It prints a table of sectors, divisions, families and flow counts, so running it
is also the quickest way to see what the repository currently holds.

## How the portal shows it

Each card in `index.html` carries its sector name and its NOGA division. The
division is the part that travels: it means the same thing in a Swiss register,
an EU register and a UN statistical office, whereas the label above it is chosen
for readability.

The cards are still written by hand. The intended next step is to generate that
section of `index.html` from the `sector.yaml` files, so adding a flow is one
YAML edit and the site follows. The metadata is already shaped for it: every
field the cards display is present. Doing it now would mean rewriting a page
that three open pull requests touch, so it is left as the obvious follow-up
rather than folded in here.

## What this does not classify

Flows are also distinguished by **trust role**, meaning who issues, who verifies
and who holds. They are distinguished again by the **protocols** they exercise.
Neither axis is captured here.
Sector and use case family answer "where does this belong in the repository",
which is the question a contributor asks first and a reader asks second. A second
axis can be added when there are enough flows for it to pay for itself.
