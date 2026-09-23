# Specialist qualifications: rigger licences and accident experts

Swiss Skydive issues two kinds of qualification beyond the skydiving licence,
each as its own credential:

- a **rigger licence**, in levels, which says what work on a rig the holder may
  do and sign for, and
- an **accident expert certificate**, which says the holder is appointed to
  investigate skydiving accidents and incidents for Swiss Skydive.

Status: **draft**. The level names and what each level permits are placeholders
until Swiss Skydive's rules fill them in.

Part of the `skydiving-licence` family. The rigger licence builds on the skydiving licence; the accident expert certificate does not have to.

**Requires** `eid-held` · **Establishes** `qualification-credential-held`

## Why separate credentials, not ratings on the licence

| | Rating inside the licence | Separate credential |
| --- | --- | --- |
| Level raised | Re-issue the licence | Re-issue only the rigger licence |
| Accident expert appointed for a term | Licence needs an `exp` it does not otherwise have | The certificate carries its own `exp` |
| What a verifier sees | Must request the licence and look inside `ratings` | Requests exactly the qualification it needs |
| Withdrawing one qualification | Revoke and re-issue the whole licence | Revoke only that credential; the licence is untouched |

Ratings that only change what the holder may jump — tandem, wingsuit,
camera — stay in the licence's `ratings`. Qualifications that let the holder
sign for someone else's safety get their own credential.

## Rigger licence

### Levels

| `rigger_level` | May do (placeholder) | Signs |
| --- | --- | --- |
| `rigger-1` | Inspect and repack reserves of standard sport rigs | Reserve repack credential |
| `rigger-2` | As level 1, plus tandem and student rigs, minor repairs | Reserve repack, repair record |
| `rigger-3` | As level 2, plus major repairs, alterations, and training and examining riggers | All of the above, rigger exams |

The claim carries the level; what a level permits is published by Swiss
Skydive and applied by the rigger service at the time of signing (see
[reserve repack](./reserve-repack.md)). That keeps the credential stable when
the rules move.

| Claim | Example | Notes |
| --- | --- | --- |
| `vct` | `https://swissskydive.org/vc/rigger-licence/v1` | Placeholder URL |
| `rigger_licence_number` | `R-0471` | |
| `rigger_level` | `rigger-2` | |
| `type_endorsements` | `["tandem-vector", "tandem-sigma"]` | Optional. Rig types the rigger is signed off on, where the rules need it |
| `licence_number` | `CH-04711` | Links to the skydiving licence |
| `family_name`, `given_name`, `birth_date` | | From the skydiving licence |
| `issue_date` | `2026-09-23` | |
| `exp` | — | Only if rigger licences expire or need periodic proof of activity |
| `status`, `cnf` | | Suspension and withdrawal; holder binding |

### Accident expert certificate

| Claim | Example | Notes |
| --- | --- | --- |
| `vct` | `https://swissskydive.org/vc/accident-expert/v1` | Placeholder URL |
| `expert_id` | `UE-012` | |
| `role` | `accident-expert` | |
| `mandate` | `Swiss Skydive accident and incident investigation` | What the appointment covers |
| `family_name`, `given_name`, `portrait` | | Portrait, because the certificate is shown in person at an accident site |
| `valid_from`, `exp` | `2026-01-01`, `2028-12-31` | Assumption: appointments run for a term |
| `status`, `cnf` | | Revoked when the appointment ends early |

## Flow A — Issuing or raising a rigger licence

```mermaid
%%{init: {"theme": "default", "themeVariables": {"fontFamily": "Inter, Arial"}}}%%
sequenceDiagram
    actor Candidate as 👤 Rigger candidate
    actor Examiner as 🧵 Examiner (rigger-3)

    box rgb(220,235,255) Candidate's device
        participant Wallet as 🪪 swiyu Wallet
    end

    box rgb(220,255,220) Swiss Skydive
        participant Portal as 🖥️ Member area
        participant Verifier as ✅ swiyu Verifier
        participant Register as 🗂️ Qualification register
        participant Issuer as 🏷️ swiyu Issuer
    end

    box rgb(255,235,210) swiyu trust infrastructure
        participant Trust as 🛡️ Base & Trust Registry
    end

    Note over Candidate,Trust: Phase 1 — Course and exam
    Candidate->>Examiner: Rigger course, practical and theory exam for level 2
    Examiner->>Portal: Sign in with own rigger licence (OID4VP, level rigger-3)
    Portal->>Register: Record exam passed: candidate, level, date, examiner

    Note over Candidate,Trust: Phase 2 — Application
    Candidate->>Portal: Apply for rigger-2
    Portal->>Verifier: Request skydiving licence<br/>(+ current rigger licence if raising a level)
    Verifier-->>Candidate: QR code
    Candidate->>Wallet: Scan, consent
    Wallet->>Verifier: VP token + key binding
    Verifier->>Trust: Swiss Skydive key, status lists
    Verifier-->>Portal: Licence CH-04711 valid, holds rigger-1
    Portal->>Register: Match exam record, check prerequisites for level 2

    Note over Candidate,Trust: Phase 3 — Issuance (OID4VCI)
    Register->>Issuer: Offer rigger licence, rigger_level = rigger-2
    Issuer-->>Candidate: Credential offer
    Candidate->>Wallet: Accept
    Wallet->>Trust: Resolve issuer DID, trust statement
    Wallet->>Issuer: Token and credential request + proof of possession
    Issuer-->>Wallet: Rigger licence, level 2
    Issuer->>Trust: Revoke the rigger-1 credential's status index
```

The examiner's own rigger licence is what makes the exam record trustworthy:
only a `rigger-3` may record a rigger exam. The same pattern — a qualification
credential that lets its holder sign for others — is what the reserve repack
flow uses.

## Flow B — Appointing an accident expert and showing the certificate at an accident

```mermaid
%%{init: {"theme": "default", "themeVariables": {"fontFamily": "Inter, Arial"}}}%%
sequenceDiagram
    actor Expert as 🔎 Accident expert

    box rgb(220,235,255) Expert's device
        participant Wallet as 🪪 swiyu Wallet
    end

    box rgb(220,255,220) Swiss Skydive
        participant Board as 🏛️ Safety board
        participant Issuer as 🏷️ swiyu Issuer
    end

    box rgb(255,235,210) swiyu trust infrastructure
        participant Trust as 🛡️ Base & Trust Registry
    end

    box rgb(240,240,240) At the accident
        actor DZ as 🪂 Drop zone / 👮 Police
        participant Check as ✅ Verifier app
    end

    Note over Expert,Check: Phase 1 — Appointment
    Board->>Board: Appoint expert for 2026–2028
    Board->>Issuer: Offer accident expert certificate, exp = 2028-12-31
    Issuer-->>Expert: Credential offer
    Expert->>Wallet: Accept
    Wallet->>Issuer: OID4VCI, proof of possession
    Issuer-->>Wallet: Accident expert certificate

    Note over Expert,Check: Phase 2 — At the scene
    Expert->>DZ: "I have been sent by Swiss Skydive"
    DZ->>Check: Request accident expert certificate<br/>(name, portrait, role, mandate)
    Check-->>Expert: QR code
    Expert->>Wallet: Scan, consent
    Wallet->>Check: VP token + key binding
    Check->>Trust: Swiss Skydive key, status list
    Check->>Check: Signature, not expired, not revoked,<br/>issuer is Swiss Skydive
    Check-->>DZ: ✅ Appointed accident expert + portrait
    DZ->>Expert: Access to equipment, AAD log, video, manifest records
```

At the scene the drop zone or the police decide on access. The certificate
answers only "is this person appointed by Swiss Skydive"; what they may see
and take is governed by Swiss Skydive's rules and, where the Swiss
Transportation Safety Investigation Board (STSB / SUST) or the police
investigate, by theirs.

## Assumptions and open questions

1. **Levels.** Which rigger levels exist, what each permits, and whether type
   endorsements are needed, are for Swiss Skydive to state. The table above is
   a placeholder to show where they go.
2. **Expiry.** Does a rigger licence lapse without activity? Is an accident
   expert appointed for a term?
3. **Verifier at the scene.** A police officer is unlikely to have a verifier
   app today. Until then the certificate is shown on the wallet screen, which
   is no better than a card; the verifiable check needs a verifier on the
   drop zone's side.
4. **Flow B mixes two kinds of work** — certifying the expert and granting
   access at the scene. If accident investigation grows further flows, the
   scene check becomes its own family.
