# Implementing the skydiving flows on swiyu

What the flows in this directory need from swiyu, what the swiyu components
support today, and the implementation path that follows from it.

Checked on 2026-09-23 against the public repositories of
[swiyu-admin-ch](https://github.com/swiyu-admin-ch):

| Repository | Commit | What was read |
| --- | --- | --- |
| `swiyu-issuer` | `d166913` (2026-09-22) | README, CHANGELOG, EXPERIMENTAL.md, service code |
| `swiyu-verifier` | `f4ddbab` (2026-09-18) | README, CHANGELOG, validators, `application.yml` |
| `swiyu-admin-ch.github.io` | `38618fe` (2026-09-17) | Swiss Profiles (VC, issuance, verification, anchor, trust, proximity), cookbooks |
| `eidch-android-wallet` | `fab8c7c` (2026-09-10) | Presentation and credential status code |
| `didtoolbox-java` | `d2a67a6` (2026-09-22) | README |

The iOS wallet was not read. Everything said about "the wallet" below is the
Android wallet. The swiyu components move fast; recheck before building.

## What swiyu supports today

### Issuance

| Topic | Today | Where |
| --- | --- | --- |
| Credential format | `dc+sd-jwt`. `vc+sd-jwt` is deprecated | issuer `README.md`, `swiss-profile-vc.md` |
| Protocol | OID4VCI, pre-authorised code flow only. DPoP, encrypted requests and responses, signed metadata are part of the profile | `swiss-profile-issuance.md` |
| Transaction code (`tx_code`) | **Rejected** by the issuer (`AuthorizationService.java`: "Unsupported parameter 'tx_code'") | issuer code |
| Offer delivery | By value in a QR code or deep link (`swiyu://`, `openid-credential-offer://`). Offer by reference is not supported | `swiss-profile-issuance.md` |
| Deferred and batch issuance | Supported. Batch issuance with a batch of 10 credentials for unlinkability | issuer README, `swiss-profile-issuance.md` |
| Holder binding | `jwk` binding, `jwt` proof; key attestation can be demanded | issuer README |
| Claims | Every business claim selectively disclosable. Arrays with per-element disclosure. Images as `data:image/png;base64,…` or `data:image/jpeg;base64,…` strings | `swiss-profile-vc.md` |
| Validity | `exp` and `nbf` are set by the issuer from `credential_valid_until` / `credential_valid_from`, in whole days. **After `exp` the wallet will not present the credential at all** | issuer README, wallet `GetCompatibleCredentialsImpl.kt` |
| Business expiry | Optional `expiry_date` claim. The wallet shows "Expired" but can still present; the verifier decides | `swiss-profile-vc.md` |
| Display | OCA bundle or issuer metadata `display`, labels in de-CH, fr-CH, it-CH, rm-CH, en-GB, logos as data URIs | `vc-visual-presentation-oca.md` |
| Tenancy | One issuer instance per issuer. "Multitenancy is not supported" | issuer README |

### Status

| Topic | Today | Where |
| --- | --- | --- |
| Mechanism | IETF Token Status List, hosted on the swiyu Status Registry | `swiss-profile-vc.md` |
| States | Valid, revoked, **suspended**. Suspension needs a list with `bits: 2` | issuer `TokenStatusListBit.java` |
| Changes | `PATCH /management/api/credentials/{id}/status`: issued ↔ suspended, → revoked (final) | issuer README |
| Wallet | **A suspended credential can still be presented.** Revoked and expired ones cannot. The verifier must reject suspended ones | wallet `GetCompatibleCredentialsImpl.kt` |

### Verification

| Topic | Today | Where |
| --- | --- | --- |
| Protocol | OID4VP 1.0 with DCQL. Presentation Exchange was dropped | verifier CHANGELOG |
| Several credentials in one request | **Not possible.** The verifier rejects `credential_sets` ("credential sets not yet supported") and `multiple`, accepts one VC per query, and the wallet submits exactly one credential per request | verifier `CreateVerificationManagementValidator.java`, `application.yml`; wallet `SubmitPresentationImpl.kt`; `swiss-profile-verification.md` |
| Request | Signed request object; `response_mode` `direct_post.jwt` | `swiss-profile-verification.md` |
| Accepted issuers | Per request: `accepted_issuer_dids` or trust anchors | verifier README |
| In person, offline | ISO 18013-5 proximity with DC-API: specified, **draft** | `swiss-profile-proximity.md` |

### Trust

| Topic | Today | Where |
| --- | --- | --- |
| DID method | `did:webvh` 1.0, created with DID Toolbox ≥ 2.1 | `swiss-profile-anchor.md` |
| Trust statements | Trust Protocol 2.0: identity trust statement (the wallet shows "verified identity") and, for verifiers, a public statement of what a query is for | `trust-protocol-v2-0.md` |
| Maturity | Trust features are marked experimental in issuer and verifier. Trust Protocol 1.0 is to be removed around mid-November 2026 | `EXPERIMENTAL.md`, issuer CHANGELOG |
| Onboarding | ePortal business partner → API subscriptions → DID space → DID Toolbox → profile verification | `onboarding-base-and-trust-registry.md` |
| Private issuers | Eligible in principle. The production onboarding route for a private association is not documented | `introduction.md` |

## What that changes in the flows

| Draft assumption | Corrected in the flows |
| --- | --- |
| Licence, insurance and repack in one request with `credential_sets` | [Manifest check-in](./manifest-check-in.md) runs **three single-credential requests in one manifest session**. The single request stays the target once verifier and wallet support it |
| Format `vc+sd-jwt` | `dc+sd-jwt` |
| Issuer DID `did:tdw` | `did:webvh` |
| "Registered issuer" in the wallet | "Verified identity" from the Trust Protocol 2.0 identity trust statement |
| Portrait as JPEG | `data:image/jpeg;base64,…` string claim |
| Repack valid for a year via `exp` | `expiry_date` for the display **and** `credential_valid_until` for the hard stop, both packing date + 12 months |
| Suspension blocks the wallet | It does not. Every verifier checks the status and rejects `suspended` |
| A rigger or a multi-tenant issuer signs | Swiss Skydive's single issuer signs; the rigger app calls its management API after verifying the rigger |
| Optional transaction code on the offer | Not available. The offer is shown in person with a short validity instead |

## Recommended implementation for Swiss Skydive

### 1. Components

| Component | Role | Notes |
| --- | --- | --- |
| swiyu Generic Issuer (≥ 4.2) | Issues all Swiss Skydive credentials | One instance, one issuer DID. Management API behind OAuth, not reachable from the internet |
| swiyu Generic Verifier (≥ 4.2) | Member area, rigger app, Swiss Skydive's own checks | Own verifier DID |
| Licence register | Source of truth: members, licences, functions, repacks | Existing member system. Calls the issuer's management API and receives its webhooks |
| Rigger app | Web app for riggers | Signs the rigger in through the verifier, then creates repack offers through the licence register |
| Drop zone verifier | At each drop zone | The drop zone runs its own Generic Verifier, or uses a hosted one from Swiss Skydive with its own DID per drop zone |

### 2. Onboarding

1. Swiss Skydive becomes a business partner in the ePortal and subscribes to
   the registry APIs.
2. Two `did:webvh` DIDs with the DID Toolbox: one issuer, one verifier.
3. Trust Protocol 2.0 onboarding, so the wallet shows Swiss Skydive as a
   verified identity. Configure the Trust Registry URL on issuer and verifier.
4. Start in the sandbox. Budget for re-onboarding when Trust Protocol 1.0 is
   removed.
5. Each drop zone and each accepted insurer does the same for its verifier or
   issuer DID.

### 3. Credential types

One `credential_configuration` and one `vct` per type, `vct` under a Swiss
Skydive domain with type metadata and an OCA bundle for the display:

| Credential | `vct` (proposal) | Validity | Status list |
| --- | --- | --- | --- |
| Skydiving licence | `…/skydiving-licence/v1` | No `exp`; valid until withdrawn | 2-bit (suspend) |
| Tandem master | `…/tandem-master/v1` | `expiry_date` 31 March, renewed on the annual function report | 2-bit |
| Rigger licence | `…/rigger-licence/v1` | Per the rigger rules; renewed like other functions if they are | 2-bit |
| Accident expert | `…/accident-expert/v1` | `expiry_date` and `exp` = end of appointment | 1-bit |
| Proof of insurance | `…/skydiving-insurance/v1` | `exp` = end of cover (day or year) | 1-bit (cancellation) |
| Reserve repack | `…/reserve-repack/v1` | `expiry_date` and `exp` = packing date + 12 months | 1-bit (faulty repack, stolen rig) |

Claim rules: `snake_case` names, ISO dates, labels in the five swiyu locales,
arrays with per-element disclosure. The claims are listed in the flow
documents.

### 4. The drop zone check

- Three single-credential requests in one manifest session: licence, then
  insurance, then repack. The manifest back end correlates them on
  `licence_number` and `container_serial`.
- `accepted_issuer_dids`: Swiss Skydive for licence and repack; Swiss Skydive
  and the accepted insurers for insurance.
- Reject `suspended` explicitly.
- Keep the result for the day, so a returning jumper scans once in the
  morning, not before every load.
- Once swiyu supports several credentials per request, collapse the three
  scans into one without changing any credential.
- Once the proximity profile is final, the same check can run offline at
  the manifest desk.

### 5. Renewal and changes

Annual function renewals (tandem master and similar) and name changes are
either revoke-and-reissue, or wallet-initiated renewal through the issuer's
renewal endpoint. Renewal needs less of the holder, but whether it may carry
changed claims needs confirming with the swiyu team.

## Blocked or open

| Item | State |
| --- | --- |
| One request, several credentials | Blocked in verifier, wallet and profile |
| Transaction code on offers | Blocked in issuer and wallet |
| Proximity check at the desk | Draft specification |
| Production onboarding for a private association, cost per DID | Not documented |
| Foreign drop zones trusting Swiss DIDs | Depends on their verifier trusting the swiyu Trust Registry |
| iOS wallet behaviour | Not checked |
