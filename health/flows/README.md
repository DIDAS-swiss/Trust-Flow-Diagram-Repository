# Flow documents

One file per flow, self-contained, with machine-readable front matter and a
human-readable body. The diagrams in [`../README.md`](../README.md) are the
same flows rendered from the LikeC4 model; these carry the parts a picture
cannot.

| Field | Meaning |
| --- | --- |
| `id` | Stable identifier, referenced from other flows |
| `status` | `implemented` · `partial` — happy path built, named gaps are not · `roadmap` — specified, deliberately not built |
| `basis` | The `basic-flow` view this builds on |
| `actors` | Roles. An organisation may hold several |
| `credentials` | `vct` values the flow issues or consumes |
| `protocols` | Wire protocols, pinned to the Swiss Profile version |
| `trust_markers` | Trust Protocol 2.0 markers the flow depends on |
| `preconditions` | Flows or states that must already hold |

Each body carries **governance constraints** (who may play each role, what they
may ask for, what they must keep), **standardisation constraints** (which parts
of the stack are fixed and which a use case chooses), and **open questions** —
where this project had to decide something the ecosystem has not, marked as its
own decision.

[`trust-flow-basis.md`](trust-flow-basis.md) maps every step onto `basic-flow`.
