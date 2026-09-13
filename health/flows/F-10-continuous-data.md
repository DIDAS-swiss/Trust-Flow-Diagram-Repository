---
id: F-10
title: Wearables and continuous data
kind: flow
interaction_scope: unresolved
composition: unresolved
data_mode: continuous
status: roadmap
roadmap_step: 3
profile_status: beyond-current-profile
profile_gaps:
  - GP-04
  - GP-05
actors:
  - holder
  - device manufacturers
  - ch.didas.health.role.practice
credentials:
  - continuous measurement credential types (not modelled)
protocols: []
protocol_status: unresolved
trust_markers: []
unresolved_requirements:
  - Measurement provenance, including a device- and software-attestation model.
    The Trust Protocol does not define a trust marker for it.
  - Standing authorisation for a continuing exchange, with scope, duration,
    modification, suspension and withdrawal.
preconditions:
  - F-07
produces:
  - Clinically usable continuous data held by the patient
---

# F-10 · Wearables and continuous data (roadmap, 2028)

Roadmap step 3, the Swiss Health App. Sketched to record why it is hard and not to
suggest it is close.

Everything in steps 1 and 2 shares a shape: discrete, low-frequency, authored
events. A dose was administered. A prescription was written. A sample was
analysed. Each has an author who can be held responsible. Each fits in a
credential.

Continuous data does not have that shape.

## Why the credential model does not transfer directly

- **Volume.** One credential per heart-rate reading does not scale: the
  documented payload limit is 20 MB per issuance batch, and a year of continuous
  monitoring is orders of magnitude beyond what a per-event credential model was
  designed for.
  Summary credentials over a period are the plausible unit, which reintroduces
  the question of who computes the summary and whether it can be trusted.
- **Authorship.** A practice attests a vaccination. What attests a step count?
  The device manufacturer can attest that a device produced a reading; no party can
  attest that the reading describes the person holding the wallet. Device
  attestation exists in the profile for *key storage*, not for measurement
  provenance and the gap is not incidental.
- **Clinical weight.** Consumer-device data is not diagnostic. Presenting it in
  a credential format carries an implication of assurance that the underlying
  measurement does not support, and a clinician seeing a signed credential may
  reasonably read more into it than is warranted. This is a clinical-safety
  consideration, not a technical obstacle.
- **Continuous authorisation.** F-03's model, where the holder sees a request and decides,
  does not fit a standing data flow. Consent to ongoing sharing is a different
  primitive, and the one where an inadequate implementation is hardest to detect.

## What would have to exist first

1. A summary-credential pattern with an accountable computation step.
2. A measurement-provenance model distinguishing "this device produced this" from
   "this describes this person".
3. Standing-authorisation semantics with a visible, revocable state the holder can
   inspect.
4. openEHR and FHIR models for the summary types. The modelling work of F-07
   applied to a data shape neither standard handles as comfortably as events.

None of these are step-1 problems. Implementing the flow before they are
resolved would present an unresolved clinical-safety question as though it had
been settled.
