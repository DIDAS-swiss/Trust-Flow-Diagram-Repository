---
id: F-09
title: Secondary use under revocable research consent
kind: flow
interaction_scope: multi-party
composition: atomic
data_mode: discrete
status: roadmap
roadmap_step: 2
profile_status: beyond-current-profile
profile_gaps:
  - GP-03
actors:
  - ch.didas.health.role.research
  - holder
credentials:
  - urn:vct:ch.didas.health.lab-report:1.0
  - urn:vct:ch.didas.health.immunization:1.0
protocols:
  - OpenID4VP 1.0 (swiss-profile-verification:1.0.0)
trust_markers:
  - viTM
  - caTM
  - gucaTM naming the research use case
preconditions:
  - F-02
  - F-03
produces:
  - A minimised contribution, under a research consent that can be withdrawn
---

# F-09 · Secondary use under revocable research consent (roadmap, 2027)

Roadmap step 2. The entitlement model is implemented and tested; the flow around
it is not built.

> **Beyond the current Swiss Profiles.** This flow explores a holder-controlled
> authorisation object with its own lifecycle and withdrawal semantics. The
> current Swiss Profiles do not define a holder-as-issuer consent-credential
> pattern, nor the governance model that would accompany one. Recorded as
> [GP-03](https://github.com/Accelerate-GmbH/digital-health-swiyu-vaccination/blob/main/docs/swiss-profile-gaps.md#gp-03--holder-originated-authorisation-object).
>
> Four things stay distinct throughout this document and none is shorthand for
> another: the wallet asking the holder to approve or decline a presentation
> request; protocol authorisation, which decides what a verifier may request;
> legal consent; and research consent under the Human Research Act.

Research access to health data is normally a negotiation between institutions
about a dataset the patient is not party to. Selective disclosure changes the
shape of that: a research entitlement can be defined so that the identifying
claims are *unobtainable*, where an undertaking is a promise to leave them unused.

In `LAB_REPORT`, the research role's entitlement is three claims and no others:
`findings`, `specimen_date` and `report_date`. `reviewRequest()` refuses a request from
that role for `patient_family_name`, which is asserted in
`packages/swiyu/test/governance.test.ts`. The refusal happens when the query is
built, before the patient is ever asked.

## What step 2 has to solve

- **Consent as a credential.** A consent that can be withdrawn needs to be an
  object with a lifecycle, held in the wallet and revocable there. A consent
  credential issued by the holder to the researcher, revocable through the same
  status list mechanism as everything else, is the obvious shape. It inverts
  the usual direction of issuance, which the trust infrastructure does not
  currently contemplate.
- **Withdrawal semantics.** Revoking the research consent credential causes
  later presentations to fail the status check. It does not recall data already
  contributed, and the consent text has to state that distinction rather than
  leave a reader to assume recall.
- **Re-identification risk.** Four LOINC-coded findings carrying dates are not
  anonymised data. Restricting which claims may be requested reduces what is
  disclosed; it does not reduce the identifying power of the values that are
  disclosed. k-anonymity, date coarsening or aggregate-only queries belong
  here.
- **HFG/LRH compliance.** The Swiss Human Research Act governs this area and
  sets its own requirements for research consent, which a credential-based
  mechanism has to satisfy rather than replace. The consent credential and the
  claim restriction are artefacts a review board can inspect, and the board
  still has to approve the study.
- **Aggregation without a collector.** Where the objective is to avoid a central
  repository, the destination of a research contribution needs thought: a study
  database is a central repository. Federated analysis or local computation over
  presented data is the coherent answer and is substantially harder.

## Why it is not built here

The mechanism that matters, entitlements that exclude identifying claims by
construction, is implemented and tested. The rest is governance work
that a hackathon prototype cannot legitimately shortcut.
