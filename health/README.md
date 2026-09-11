# Health

Trust flows for the health sector: vaccination records issued to a patient's
wallet, and the consultation around them — check-in against an e-ID and an
insurance card, a prescription redeemed once at a pharmacy, and a correction
when a dose was recorded wrongly.

> **Disclaimer:** These are not official flows of the swiyu team, eHealth Suisse
> or any other authority, and are published without warranty. This is a work in
> progress, for discussion purposes only — diagrams may be updated and
> republished over time as discussions continue and the trust flows evolve.

**NOGA 2025:** division 86, Human health activities (section R). See
[`../CLASSIFICATION.md`](../CLASSIFICATION.md).

## The showcase

A vaccination is administered. Whoever administered it issues one credential
per dose into the patient's wallet. A travel clinic later confirms the patient
is protected and receives **four claims out of the eighteen** the credential
holds — the other fourteen are never transmitted, because the wallet releases
only the claim paths the query names and the query is built from the verifier's
registered entitlement.

No registry sits in the middle. The only shared infrastructure is a status list
of two bits per credential, carrying no patient data.

## Flows

| | Flow | What it shows |
| --- | --- | --- |
| F-01 | Becoming an actor | DID publication, identity verification, and the role grant that has no body to grant it |
| F-02 | Recording an administered dose | Status list, issuance gate, offer, metadata fetch, credential |
| F-03 | Proving protection, and nothing else | Four claims of eighteen, with the consent moment and the decline branch |
| F-04 | Check-in at the practice | Two DCQL queries in one request, and the protected AHV number |
| F-05 | Redeeming a prescription | Presentation, then revocation by the original issuer |
| F-06 | Correcting a recorded dose | Revoke, supersede, and the holder notification that is missing |

Modelled in [LikeC4](https://likec4.dev), the same way `basic-flow/` is, so the
notes carry the protocol and the format while the diagram stays readable.

```bash
npx likec4 start likec4-health      # local server with live reload
npx likec4 validate likec4-health   # parse and check
```

## What these flows reuse from `basic-flow`

The generic mechanics — publishing a DID, obtaining a token, checking a
signature — are the reference model's, and are referenced instead of repeated.
F-03 in particular *is* the reference `verification` view with a different claim
name: "is this person protected against diphtheria" where the reference asks "is
this person over 18".

Three steps needed here have no shape in the reference model, and each is an
open issue in this repository:

| Gap | Issue |
| --- | --- |
| Accreditation is one generic capability. Health needs it scoped to a role and a credential type, granted by a body that can read MedReg and the cantonal authorisation, with one organisation holding several roles | [#3](https://github.com/DIDAS-swiss/Trust-Flow-Diagram-Repository/issues/3) |
| Issuance omits the signed-metadata, Type Metadata and OCA fetch a wallet makes before the token request, and publishes the status entry after issuance where the Swiss Profile requires it to exist before | [#4](https://github.com/DIDAS-swiss/Trust-Flow-Diagram-Repository/issues/4) |
| Verification has no branch for the holder declining, though the two steps before the proof exist so the holder can be shown something to act on | [#5](https://github.com/DIDAS-swiss/Trust-Flow-Diagram-Repository/issues/5) |

The full step-by-step mapping is
[here](https://github.com/DIDAS-swiss/digital-health_swiyu/blob/main/flows/trust-flow-basis.md).

## Bound to the Swiss health standards

Claims carry their CH VACD or CH EMED element path, their openEHR archetype and
CKM node name, and the CH Core naming system for every identifier —
`urn:oid:2.51.1.3` for GLN, `urn:oid:2.16.756.5.30.1.123.100.1.1.1` for the
insurance card number, `urn:oid:2.16.756.5.32` for the AHV number. A relying
party rebuilds whichever representation it already understands, locally, from
what the holder released.

Two points a reader of the diagrams may want:

- **CH Core reaches the same minimisation rule from the other side.**
  `CHCorePatientEPR` sets both `EPR-SPID` and `AHVN13` to `0..0`, forbidding
  them in any document shared through the EPR. These flows get there through the
  swiyu protected-field mechanism instead, and land in the same place.
- **CH VACD already models supersession and merge conflicts.** F-06's correction
  uses the CH VACD `relatesTo` shape, and the merge-conflict reference that
  standard defines is the answer to reconciling a vaccination series reported by
  several issuers.

[Full alignment note](https://github.com/DIDAS-swiss/digital-health_swiyu/blob/main/docs/ehealth-suisse-alignment.md),
including where this design diverges and why.

## The honest headline

Organisation onboarding, identity onboarding and the verification query public
statement are all self-service on the swiyu Sandbox today. The role grant is
not: **no health-domain governance body exists** to state that a given DID is a
practice authorised to vaccinate. Until one does, verification relies on
explicitly listed issuer DIDs — adequate for a pilot, inadequate at scale.

The technology is ready some distance ahead of the institutional arrangements.
That is the finding these flows exist to surface, and it is why F-01 is listed
first.

## Source

Built and documented in
[DIDAS-swiss/digital-health_swiyu](https://github.com/DIDAS-swiss/digital-health_swiyu),
an end-to-end implementation on the swiyu Sandbox against Swiss Profiles 1.0,
continuing [GovTech Hackathon 2024 project
1103](https://hack.opendata.ch/project/1103).

## Contributors

- DIDAS Digital Health working group
