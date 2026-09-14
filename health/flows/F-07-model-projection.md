---
id: F-07
title: Projecting a presented credential into FHIR and openEHR
kind: transformation
interaction_scope: local
composition: atomic
data_mode: discrete
status: implemented
roadmap_step: 1
profile_status: mixed
profile_gaps:
  - GP-02
actors:
  - any verifying role
credentials:
  - all
protocols: []
input:
  - Claims disclosed in a completed presentation
representations:
  - HL7 FHIR R4 (CH VACD, CH EMED, CH Core; IPS from step 2)
  - openEHR flat-format composition
trust_markers: []
preconditions:
  - F-03 or F-04 or F-05
produces:
  - A local FHIR resource and/or openEHR composition, derived and non-authoritative
---

# F-07 · Projecting a presented credential into FHIR and openEHR

## What kind of object this is

F-07 declares `kind: transformation` and `interaction_scope: local`. F-01 to
F-06, F-09 and F-11 declare `kind: flow` and `interaction_scope: multi-party`:
they describe messages exchanged between two or more parties over a named
protocol. F-07 describes a transformation performed inside one party after such
an exchange has completed.

| | |
| --- | --- |
| Begins | after F-03, F-04 or F-05 has completed |
| Input | the claims disclosed in that presentation |
| Performed by | the verifying organisation, in its own systems |
| Output | a FHIR resource, an openEHR composition, or both, held locally |
| Parties involved | one |
| Protocol messages exchanged | none |
| Profile status | `mixed`. The mappings are a choice of this demonstrator; provenance for the derived object is [GP-02](https://github.com/Accelerate-GmbH/digital-health-swiyu-vaccination/blob/main/docs/swiss-profile-gaps.md#gp-02--provenance-of-a-derived-representation) |

Because no messages pass between parties, the LikeC4 model carries no sequence
view for F-07. The seven dynamic views in `likec4/health-flow.likec4` each render
an exchange between lifelines, and a sequence diagram of a single-party
transformation would show one lifeline. The absence of a view records the
interaction scope of the step rather than an omission or unfinished work: the
mapping is implemented in `packages/swiyu/src/projections.ts` and covered by
twelve tests in `packages/swiyu/test/projections.test.ts`. Implemented and tested
in this repository is not deployment, Swiss Profile endorsement, or clinical
validation of the mappings.

The credential definitions in this demonstrator associate each claim with a FHIR
element path and, where one exists, an openEHR archetype path. A receiving system
that holds disclosed claims can therefore construct a local representation
according to those mappings, without a further request to any other party.

## The architectural position

HL7 FHIR and openEHR provide models and implementation patterns for
representing, exchanging and, in openEHR's case, persisting clinical
information: archetypes, templates, resource profiles and terminology bindings.
Whether the same laboratory result carries the same meaning in two systems
depends on the profiles both apply, the terminology bindings they use and the
constraints of each implementation. Verifiable credentials and the swiyu Trust
Infrastructure address a different layer: authenticity, provenance, controlled
presentation, and the statements a party evaluates about another party. The two
layers can be composed.

This demonstrator reuses the information models and does not operate a FHIR
server or an openEHR clinical data repository. That is a scope choice for this
prototype, not a judgement on either architecture; a deployment composing the
two is described in [positioning](https://github.com/Accelerate-GmbH/digital-health-swiyu-vaccination/blob/main/docs/positioning.md).

Every claim in every credential type carries the FHIR element path and, where
one exists, the openEHR archetype path it corresponds to. At presentation, the
receiving system can rebuild the representation it already understands, locally,
from the claims the holder released.

The diagram below is an internal data-flow diagram and not a sequence diagram.
Only the topmost edge crosses a party boundary, and that edge belongs to F-03,
F-04 or F-05 rather than to F-07.

```mermaid
flowchart TB
    subgraph EX["F-03, F-04 or F-05 · interaction flow, two parties"]
        W["Patient wallet<br/>SD-JWT VC"] -->|"OpenID4VP, selective disclosure"| V["Verifier"]
    end
    V ==>|"disclosed claims"| P
    subgraph LOC["F-07 · local transformation, inside the verifying organisation"]
        P["Projection<br/>projections.ts"] --> F["FHIR Immunization, MedicationRequest,<br/>DiagnosticReport and Observation"]
        P --> O["openEHR flat composition<br/>template and archetype paths"]
    end
    F --> S1["Practice management system"]
    O --> S2["Analysis, research export, or a clinical data<br/>repository for deployments that run one"]
    style W stroke-width:3px
```

## Two properties to preserve

- **A projection is derived, not authoritative.** The signed SD-JWT VC is the
  verifiable artefact. The FHIR resource built from it carries no signature, so
  nothing about its provenance can be checked from the resource alone. A system
  that needs to evidence provenance later has to retain the presentation
  alongside the projection. A system that retains only the projection cannot
  reconstruct it.
- **A projection is legitimately partial.** After selective disclosure, a
  `DiagnosticReport` may have findings and no patient name. Receiving systems
  must tolerate that instead of treating a missing element as an error. This is
  the main integration cost of the whole approach.

## Governance constraints

- **Projection does not launder entitlement.** Claims outside the verifier's
  entitlement are absent from the projection because they were never disclosed.
  The projection does not contain those claim values and therefore does not
  provide the information needed to recover them.
- **Retention attaches to the projection too.** Building a FHIR resource is how a
  verifier retains data; the retention rule on the credential type governs it.
- **Unmapped claims are reported.** Both projections return the list
  of disclosed claims that had no binding, so a modelling gap surfaces instead of
  silently losing data.

## Standardisation constraints

- Immunization → `Immunization` (CH VACD; `Immunization-uv-ips` from step 2) and
  `openEHR-EHR-ACTION.medication.v1`.
- Prescription → `MedicationRequest` (CH EMED) and
  `openEHR-EHR-INSTRUCTION.medication_order.v3`.
- Laboratory report → `DiagnosticReport` + one `Observation` per finding, and
  `openEHR-EHR-OBSERVATION.laboratory_test_result.v1`.
- Insurance card → `Coverage` (CH Core). No openEHR model: openEHR describes the
  clinical record.
- Terminology: SNOMED CT for vaccines and diseases, LOINC for analytes, UCUM for
  units, GTIN for medication packs, GLN for professionals, AHVN13 for the
  protected administrative number.
- openEHR output is flat format: template path to value, with `:n` indices on
  repeating nodes. That is what a CDR's flat endpoint accepts for deployments
  that have one.

## Open questions

1. **Round-tripping.** Projection is one-way. Whether a FHIR resource should be
   convertible back into a credential is a step-2 question, as is who would sign
   the result. Both are raised by the openEHR/HL7 joint working group's
   ambitions.
2. **`meta.profile` names a profile; conformance to it is not asserted.** A
   projected resource carries `meta.profile` as a pointer to the profile it is
   shaped towards, and this repository does not claim the resource conforms to
   that profile. No resource has been run through a FHIR validator: the FHIR
   package registry is unreachable from the environment this is developed in,
   so `hl7.fhir.r4.core` and the CH IG packages cannot be obtained.
   `packages/swiyu/test/ch-profile-conformance.test.ts` pins the constraints
   checkable without a validator and records one known non-conformance, the
   mandatory `CHVACDExtensionVerificationStatus` that the projection does not
   emit. See [eHealth Suisse alignment](https://github.com/Accelerate-GmbH/digital-health-swiyu-vaccination/blob/main/docs/ehealth-suisse-alignment.md).
3. **openEHR templates are sketched and unpublished.** `DIDAS.immunisation.v0`
   and its siblings are named here; real operational templates would have to be
   modelled and published for the paths to be more than plausible.

## Implementation status

`implemented`. `packages/swiyu/src/projections.ts`, covered by
`packages/swiyu/test/projections.test.ts` and visible in the demo UI next to
the credential it was built from.
