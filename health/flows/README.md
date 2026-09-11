# Flow documents

One file per flow, self-contained, with machine-readable front matter and a
human-readable body. The diagrams in [`../README.md`](../README.md) are the same
flows rendered from the LikeC4 model. These files carry the parts a picture
cannot.

| Field | Meaning |
| --- | --- |
| `id` | Stable identifier, referenced from other flows |
| `status` | `implemented`: runnable. `partial`: the happy path is built, named gaps are not. `roadmap`: specified, deliberately not built |
| `basis` | The `basic-flow` view this builds on |
| `actors` | Roles. An organisation may hold several |
| `credentials` | `vct` values the flow issues or consumes |
| `protocols` | Wire protocols, pinned to the Swiss Profile version |
| `trust_markers` | Trust Protocol 2.0 markers the flow depends on |
| `preconditions` | Flows or states that must already hold |

Each body carries three further sections. **Governance constraints** say who may
play each role, what they may ask for and what they must keep. **Standardisation
constraints** say which parts of the stack are fixed and which a use case
chooses. **Open questions** record where this project had to decide something
the ecosystem has not, marked as its own decision rather than as settled
practice.

| Flow | Title | Status |
| --- | --- | --- |
| [F-01](F-01-actor-onboarding.md) | Becoming an actor in the health trust domain | `partial` |
| [F-02](F-02-immunization-issuance.md) | Recording an administered dose | `implemented` |
| [F-03](F-03-immunization-minimal-disclosure.md) | Proving protection and nothing else | `implemented` |
| [F-04](F-04-practice-check-in.md) | Check-in at the practice | `implemented` |
| [F-05](F-05-prescription-redemption.md) | Redeeming a prescription, exactly once | `implemented` |
| [F-06](F-06-lifecycle-and-correction.md) | Correcting a recorded dose | `partial` |
| [F-07](F-07-model-projection.md) | Projecting a presented credential into FHIR and openEHR | `implemented` |
| [F-08](F-08-patient-summary.md) | Assembling an International Patient Summary | `roadmap` |
| [F-09](F-09-secondary-use.md) | Secondary use under revocable consent | `roadmap` |
| [F-10](F-10-continuous-data.md) | Wearables and continuous data | `roadmap` |
| [F-11](F-11-coverage-survey.md) | Answering the national coverage survey | `roadmap` |

[`trust-flow-basis.md`](trust-flow-basis.md) maps every step onto `basic-flow`.
