# Flow blueprint

This directory is the **blueprint** deliverable of roadmap step 1: eleven flows
of the use case, written down so that they can be reviewed, disputed and reused
by other projects. They are kept separate from the code and from `docs/` because
they are intended for **transfer into a trust flows repository**, where they
will sit next to flows from sectors unrelated to this codebase.

The reference model they build on is the [Trust Flow Diagram
Repository](https://github.com/DIDAS-swiss/Trust-Flow-Diagram-Repository), whose
`basic-flow/` covers registration, issuance and verification for the Swiss e-ID
trust infrastructure. Its convention is that domain flows abstract those steps
and point back to it and these flows follow it.
[`likec4/`](../likec4-health/) holds the same flows as a C4 model, validated in
CI and published as interactive diagrams alongside the portal.
[`trust-flow-basis.md`](trust-flow-basis.md) records the mapping step by step:
which of our steps are the reference flow under another name, which are
health-specific additions and the three the reference model has no shape for,
each raised there as an issue.

That intent shapes the format:

- **One file per flow, self-contained.** A flow can be copied out on its own
  without dragging half a repository behind it. Cross-references between flows
  use flow ids, never file paths.
- **Machine-readable front matter, human-readable body.** The YAML block is
  what a registry can index: actors, credential types, protocols, trust markers,
  status. The prose is what a person needs in order to disagree with it.
- **Governance and standardisation constraints are first-class sections**, not
  footnotes. A flow that documents only the message exchange is the easy half.
  The half that decides whether a flow can be deployed is who is allowed to
  play each role, what they may ask for, what they must keep and which parts of
  the standards stack are fixed. The Swiss Profile settles the credential
  format, the algorithms and the protocol flows; what a use case decides is
  which claims its presentation requests select.
- **Open questions are recorded.** Where this project
  had to decide something that the ecosystem has not decided, the decision is
  marked as ours.

## Reading the front matter

| Field | Meaning |
| --- | --- |
| `id` | Stable identifier. Referenced from other flows and from code comments. |
| `kind`, `interaction_scope`, `composition`, `data_mode` | What kind of step this is, on four independent axes. See below. |
| `profile_status`, `profile_gaps` | Whether the flow runs on the current Swiss Profiles, and which entries in [the gap register](https://github.com/DIDAS-swiss/digital-health_swiyu/blob/main/docs/swiss-profile-gaps.md) it depends on. |
| `status` | `implemented`: runnable in this repository. `partial`: the happy path is implemented, named gaps are not. `roadmap`: specified here, deliberately not built. |
| `roadmap_step` | 1 = Immunization Showcase (2026), 2 = International Patient Summary (2027), 3 = Swiss Health App (2028). |
| `actors` | Roles. An organisation may hold several. |
| `credentials` | `vct` values the flow issues or consumes. |
| `protocols` | Wire protocols carrying messages between parties, pinned to the Swiss Profile version. Empty where no message crosses a party boundary. |
| `protocol_status` | `unresolved` where the flow needs a protocol that has not been chosen. A blank `protocols` list is not a statement; this is. |
| `representations` | Information models the step produces or consumes. A representation is not a protocol and is recorded separately from one. |
| `input` | What the step consumes where that is not a protocol message. |
| `unresolved_requirements` | Capabilities the flow needs that neither the profiles nor this project provide. |
| `trust_markers` | Trust Protocol 2.0 markers the flow depends on. |
| `preconditions` | Flows or states that must already hold. |
| `basis` | The `basic-flow` view in the Trust Flow Diagram Repository this flow builds on. |

### The four characteristics

The set is not homogeneous, and the ways it varies are independent of each
other. An earlier version of this table used one `type` field with four
exclusive values, which conflated them: F-08 is a composition **and** an
inter-party exchange, and F-10 is continuous, which says nothing about whether it
is local or multi-party. Four orthogonal fields replace it. Each flow declares
all four rather than leaving a reader to infer them from `actors` and
`protocols`.

| Field | Values | What it says |
| --- | --- | --- |
| `kind` | `flow`, `transformation` | Whether the step is an exchange or a computation over data already held |
| `interaction_scope` | `multi-party`, `local`, `unresolved` | Whether messages cross a party boundary |
| `composition` | `atomic`, `composed`, `unresolved` | Whether the step is built from other flows |
| `data_mode` | `discrete`, `continuous` | Whether it concerns a bounded event or a continuing stream |

| Flow | `kind` | `interaction_scope` | `composition` | `data_mode` |
| --- | --- | --- | --- | --- |
| F-01 to F-06, F-09, F-11 | `flow` | `multi-party` | `atomic` | `discrete` |
| F-07 | `transformation` | `local` | `atomic` | `discrete` |
| F-08 | `flow` | `multi-party` | `composed` | `discrete` |
| F-10 | `flow` | `unresolved` | `unresolved` | `continuous` |

F-08 is the case the exclusive model got wrong. It composes F-02, F-05 and F-07,
and it is also an OpenID4VP exchange with a clinician. Both are true, and they
are recorded in different fields. F-10 is the other: continuity is a property of
the data, and whether a continuing measurement exchange is local or multi-party
is one of the things F-10 leaves open, so `interaction_scope` and `composition`
are `unresolved` rather than guessed.

### Which flows have a sequence view, and why

`interaction_scope` decides it, not maturity and not `composition`.

| Flow | Sequence view | Why |
| --- | --- | --- |
| F-01 to F-06, F-11 | Yes | `multi-party`, and modelled |
| F-07 | No | `local`. A sequence diagram of a single-party transformation would show one lifeline |
| F-08 | Not yet | `multi-party` and `composed`, so a view is possible; it is `roadmap` and not modelled |
| F-09 | Not yet | `multi-party`, `roadmap` |
| F-10 | No | `interaction_scope` is `unresolved`; there is no exchange to draw |

A flow without a sequence view is therefore not necessarily unfinished. F-07 is
`implemented`, and it has no view because of where its work happens.

`npm run check:flow-types` enforces the semantics rather than the shape:
`interaction_scope: local` means `protocols` is empty; `kind: transformation`
implies `interaction_scope: local`; a `multi-party` flow names a protocol or
declares `protocol_status: unresolved`; an information model belongs in
`representations`; every dynamic view in the model is claimed by exactly one
`multi-party` flow and every implemented one has a view; and every
`profile_gaps` entry resolves to a gap in the register. `composition: composed`
does not prevent a view, and `data_mode` constrains nothing. It runs in CI on
every pull request.

## Status of the set

| Flow | Title | `kind` / `interaction_scope` | `profile_status` | Status | Step |
| --- | --- | --- | --- | --- | --- |
| [F-01](F-01-actor-onboarding.md) | Becoming an actor | `flow / multi-party` | `mixed` | `partial` | 1 |
| [F-02](F-02-immunization-issuance.md) | Recording an administered dose | `flow / multi-party` | `mixed` | `implemented` | 1 |
| [F-03](F-03-immunization-minimal-disclosure.md) | Presenting vaccination evidence with minimal disclosure | `flow / multi-party` | `mixed` | `implemented` | 1 |
| [F-04](F-04-practice-check-in.md) | Check-in at the practice | `flow / multi-party` | `mixed` | `implemented` | 1 |
| [F-05](F-05-prescription-redemption.md) | Prescription and its redemption | `flow / multi-party` | `mixed` | `implemented` | 1 |
| [F-06](F-06-lifecycle-and-correction.md) | Correction, suspension and revocation | `flow / multi-party` | `mixed` | `partial` | 1 |
| [F-07](F-07-model-projection.md) | Projecting into FHIR and openEHR | `transformation / local` | `mixed` | `implemented` | 1 |
| [F-08](F-08-patient-summary.md) | Assembling an International Patient Summary | `flow / multi-party, composed` | `beyond-current-profile` | `roadmap` | 2 |
| [F-09](F-09-secondary-use.md) | Secondary use under revocable research consent | `flow / multi-party` | `beyond-current-profile` | `roadmap` | 2 |
| [F-10](F-10-continuous-data.md) | Wearables and continuous data | `flow / unresolved` | `beyond-current-profile` | `roadmap` | 3 |
| [F-11](F-11-coverage-survey.md) | Answering the national coverage survey | `flow / multi-party` | `mixed` | `roadmap` | 2 |

## What is deliberately not here

- **Wallet internals.** How a wallet stores, backs up or restores credentials is
  the wallet's concern and is specified by the Confederation.
- **Billing.** The practice bills through existing channels; making that a flow
  would imply the trust infrastructure replaces it, which it does not.
- **Identity proofing.** How a person obtains an e-ID is upstream of everything
  here. F-01 covers *organisational* onboarding only.
