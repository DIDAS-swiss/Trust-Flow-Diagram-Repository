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

"Derives from" understates it at the levels this repository uses. The section
letters and division numbers are *identical* to ISIC Rev. 5 — checked against
the UN Statistics Division's published structure file, all 22 sections and all
23 divisions codified here agree, with three section titles differing in
spelling only. `noga-2025.yaml` records that as `equivalent_to`. It stops at
division level, where NACE and NOGA add detail ISIC does not have, which is
another reason to key on the division.

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

## The codified entries

[`noga-2025.yaml`](noga-2025.yaml) holds the classification itself, so that
classifying a sector is a choice from a list rather than a transcription from a
website.

| Part of the file | What is in it |
| --- | --- |
| `scheme` | Which classification this is, who publishes it, where to look a code up and when the entries were read |
| `sections` | All 22 section letters with their titles, complete |
| `divisions` | The divisions this repository uses, plus the ones a trust flow is most likely to need, each with its section and, where the choice between two divisions is easy to get wrong, a note |

Search it from the command line:

```bash
python3 scripts/check-classification.py --noga            # everything
python3 scripts/check-classification.py --noga insurance  # by title
python3 scripts/check-classification.py --noga 86         # by code
```

A search that matches one division prints the block ready to paste:

```
$ python3 scripts/check-classification.py --noga 86
NOGA 2025 divisions codified here
------------------------------------------------------------------------
  86  Human health activities   (section R)   [claimed by health/]

Paste this into <your-sector>/sector.yaml:

noga:
  division: "86"
  division_title: Human health activities
  section: R
  section_title: Human health and social work activities
  scheme: NOGA 2025
```

The section list is complete, so the check treats a section letter outside it
as an error. The division list is a working subset: transcribing all 87
divisions would add rows that no trust flow will claim, each carrying a title
that has to be right. A division that is in the file is checked against it. A
division that is missing is accepted and the check asks for the row to be added
in the same pull request, which is how the file grows.

Every row was read from the KUBB page for that code,
`https://www.kubb-tool.bfs.admin.ch/en/noga/2025/<code>`. Titles are recorded in
sentence case. KUBB prints section titles in capitals, which is a rendering
choice rather than part of the name.

## The second axis: business function

A sector says which industry the relying party is in. It does not say what kind
of work the flow is. Re-KYC, university matriculation and patient admission sit
in three different sectors, and two of them are the same work — establishing
that a person is who they claim before a relationship starts or resumes.

Sector alone cannot express that, so a reader looking for "how is identity
proofing done here" has to open every sector and guess. Each family therefore
also names a **function**:

```yaml
    functions:
      primary: customer-onboarding
      supporting: [identity-proofing, regulatory-compliance]
```

One primary — the thing the family exists to do — and any number of supporting.
The ids come from [`functions.yaml`](functions.yaml), searchable the same way
the divisions are:

```bash
python3 scripts/check-classification.py --functions onboarding
```

Functions are deliberately **not** exclusive. Two sectors performing the same
function is the entire point of the axis, so unlike a division, a function is
not claimed by one directory. Nor are they derived from the sector: "quality
audit" is the same function in automotive and in pharma, and it stays the same
function here.

The vocabulary is maintained in
[industry-function-graph](https://github.com/DIDAS-swiss/industry-function-graph),
which keys its functions to the same division numbers used here and links its
use cases back to the flows in this repository. `functions.yaml` is a local copy
for the same reason `noga-2025.yaml` is: classifying should be a choice from a
list, and the check has to work offline.

**A family whose flows have different primary functions is a family worth
splitting.** `education/` is the current example: the school issues a
certificate and the university onboards a student, which are two kinds of work
in one family. The `functions` block records the dominant one and says so in a
comment rather than quietly picking a side.

### Adoption is gradual

A family without a `functions` block is a note, not a failure — the same
treatment an uncodified division gets. A family naming a function that does not
exist **is** a failure, because that is a typo or an invention and both spread.

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
    functions:
      primary: service-delivery
      supporting: [identity-proofing, records-management]
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
| `functions` | What kind of work the family is: one `primary`, any number of `supporting` |
| `status` | Where the work has got to. The vocabulary is below |

Kept deliberately small. A schema nobody fills in is worse than a convention
nobody wrote down.

## Adding a flow

Most contributions add a flow to a sector that already exists. That is four
questions and one file. The pull request template asks for the answers, so the
classification is settled while the flow is fresh rather than chased in review.

1. **Which sector?** The industry the *relying party* operates in, not the
   industry of whoever wrote the flow. A bank verifying a school certificate is
   a banking flow.
2. **Which family?** Does it share a trigger and a set of actors with a family
   that is already there? If yes, add it to that family's `flows:` list. If no,
   add a family. A family is cheap. Getting one wrong is not.
3. **What kind of work is it?** If the flow starts a new family, give the family
   a `functions` block — `--functions <search>` prints one ready to paste. If it
   joins an existing family and does something materially different, that is a
   sign it is a new family.
4. **What state is it in?** Pick a status from the vocabulary below and be
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

1. Find the **division** with
   `python3 scripts/check-classification.py --noga <search>`. If nothing
   matches, look the activity up in [KUBB](https://www.kubb-tool.bfs.admin.ch/en),
   take the division and add its row to
   [`noga-2025.yaml`](noga-2025.yaml) in the same pull request.
2. Create `<sector>/` and let the script write the file:

   ```bash
   python3 scripts/check-classification.py --new retail 47
   ```

   That writes `retail/sector.yaml` with the whole `noga:` block filled in from
   the codified entry, and a family stub waiting for its functions. Without the
   division it writes the stub and tells you which two searches to run. Copying
   [`sector.template.yaml`](sector.template.yaml) by hand does the same job.
3. Fill in the family's **functions** with
   `python3 scripts/check-classification.py --functions <search>`.
4. Add a `README.md` naming the flows and their contributors, as `banking/` and
   `education/` do.
5. Add a card to the portal in `index.html`, with the division beside the sector
   name as the existing cards have.
6. Run `python3 scripts/check-classification.py`.

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
- a `section` letter that is not one of the 22 in [`noga-2025.yaml`](noga-2025.yaml)
- a `section_title` or `division_title` that differs from the codified title
- a division that sits in a different section from the one the sector claims
- a malformed row in `noga-2025.yaml` itself: a division that is not two digits,
  listed twice, untitled, or filed under a section letter that does not exist
- two sectors claiming the same division
- a family or flow status outside the vocabulary above
- a duplicate flow id inside one sector
- a `functions` block that is malformed, has no `primary`, names a function that
  is not in [`functions.yaml`](functions.yaml), or lists the same function as
  both primary and supporting
- a malformed row in `functions.yaml` itself: a function with no title, no
  definition, or a `broader` that is not in the list
- a `directory:` or `diagram:` that points at a file that is not there

It notes, without failing, a division that is not yet codified, a family with no
`functions` block yet, and a `scheme` that names a classification other than the
codified one. All three are things a reviewer should see and none is a reason to
block a pull request.

It prints a table of sectors, divisions, families and flow counts, plus how many
families carry a function, so running it is also the quickest way to see what the
repository currently holds and how far the second axis has got.

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
