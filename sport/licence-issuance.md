# Licence issuance

Swiss Skydive issues the skydiving licence as a verifiable credential into the
skydiver's swiyu wallet. The e-ID replaces the copy of an identity document in
the application, and the licence carries the name and date of birth taken from
it, so a verifier later needs one credential rather than two.

Status: **draft**. See the [open questions](./README.md#open-questions-for-swiss-skydive).

**Requires** `eid-held` · **Establishes** `qualification-credential-held`

The flow runs in four phases:

1. **Proficiency.** The student finishes AFF training and passes the proficiency
   test at a certified facility, which reports the result to Swiss Skydive. This
   is today's process and is only shown so the trigger is clear.
2. **Application with the e-ID.** The student applies in the Swiss Skydive
   member area and presents name, date of birth and, optionally, portrait from
   the e-ID over OID4VP.
3. **Eligibility.** Swiss Skydive matches the e-ID to the reported test,
   checks membership and fee, and creates the licence in its register.
4. **Issuance.** The member area shows a credential offer, and the wallet
   collects the licence over OID4VCI.

Before any of this, Swiss Skydive has registered as issuer and verifier on the
swiyu trust infrastructure: a DID in the Base Registry and a trust statement in
the Trust Registry. That one-time setup is the `registration` view of
[`basic-flow/`](../basic-flow).

## Phase 1 and 2: proficiency and application

```mermaid
%%{init: {"theme": "default", "themeVariables": {"fontFamily": "Inter, Arial"}}}%%
sequenceDiagram
    actor Student as 👤 Student skydiver

    box rgb(220,235,255) Student's device
        participant Wallet as 🪪 swiyu Wallet
        participant Browser as 🌐 Browser
    end

    participant School as 🪂 Certified training facility

    box rgb(220,255,220) Swiss Skydive
        participant Portal as 🖥️ Member area
        participant Register as 🗂️ Licence register
        participant Verifier as ✅ swiyu Verifier
    end

    box rgb(255,235,210) swiyu trust infrastructure
        participant Trust as 🛡️ Base & Trust Registry
    end

    Note over Student,Trust: Phase 1 — Proficiency (today's process)
    Student->>School: AFF levels, ≥ 25 logged jumps, theory exam
    School->>School: Proficiency test passed
    School->>Register: Report result: name, date of birth, date of test, examiner
    Note right of Register: Stored as "pending application".<br/>No credential exists yet.

    Note over Student,Trust: Phase 2 — Application with the e-ID
    Student->>Browser: Log in to member area, "Apply for licence"
    Browser->>Portal: Start application
    Portal->>Verifier: Create presentation request<br/>(e-ID: family_name, given_name, birth_date, portrait?)
    Verifier-->>Portal: Request URI
    Portal-->>Browser: QR code / deep link
    Browser-->>Student: Show QR code
    Student->>Wallet: Scan QR code
    Wallet->>Verifier: Fetch signed request (OID4VP)
    Wallet->>Trust: Resolve verifier DID, check trust statement
    Trust-->>Wallet: "Swiss Skydive" — registered verifier
    Wallet-->>Student: Swiss Skydive asks for name, date of birth, portrait
    Student->>Wallet: Consent
    Wallet->>Verifier: VP token: e-ID disclosures + key binding JWT
    Verifier->>Trust: Resolve e-ID issuer DID, fetch status list
    Trust-->>Verifier: Issuer key, e-ID not revoked
    Verifier->>Verifier: Check signature, disclosures, key binding, nonce
    Verifier-->>Portal: Verified claims
```

The portrait is optional. Requesting it only makes sense if Swiss Skydive puts
it into the licence, which is a decision about the credential schema
(see the [README](./README.md#the-licence-credential)).

## Phase 3 and 4: eligibility and issuance

```mermaid
%%{init: {"theme": "default", "themeVariables": {"fontFamily": "Inter, Arial"}}}%%
sequenceDiagram
    actor Student as 👤 Student skydiver

    box rgb(220,235,255) Student's device
        participant Wallet as 🪪 swiyu Wallet
        participant Browser as 🌐 Browser
    end

    box rgb(220,255,220) Swiss Skydive
        participant Portal as 🖥️ Member area
        participant Register as 🗂️ Licence register
        participant Issuer as 🏷️ swiyu Issuer
    end

    box rgb(255,235,210) swiyu trust infrastructure
        participant Trust as 🛡️ Base & Trust Registry
    end

    Note over Student,Trust: Phase 3 — Eligibility
    Portal->>Register: Find pending application matching<br/>family_name, given_name, birth_date
    Register-->>Portal: Proficiency test passed on 2026-09-12
    Portal->>Register: Check membership (Swiss Skydive, Aero-Club) and licence fee
    alt Not eligible
        Portal-->>Browser: Explain what is missing (no test on file, membership, fee)
    else Eligible
        Portal->>Register: Create licence, assign licence number
    end

    Note over Student,Trust: Phase 4 — Issuance (OID4VCI, pre-authorised code)
    Portal->>Issuer: Create credential offer<br/>(licence claims, status list index)
    Issuer-->>Portal: Credential offer with pre-authorised code
    Portal-->>Browser: QR code / deep link
    Browser-->>Student: "Add your licence to the wallet"
    Student->>Wallet: Scan QR code
    Wallet->>Issuer: Fetch issuer metadata
    Wallet->>Trust: Resolve issuer DID, check trust statement
    Trust-->>Wallet: "Swiss Skydive" — registered issuer
    Wallet-->>Student: Swiss Skydive offers "Skydiving licence"
    Student->>Wallet: Accept
    Wallet->>Issuer: Token request (pre-authorised code)
    Issuer-->>Wallet: Access token, c_nonce
    Wallet->>Wallet: Generate holder key, sign proof with c_nonce
    Wallet->>Issuer: Credential request + proof of possession
    Issuer->>Issuer: Sign SD-JWT VC (claims, cnf = holder key, status)
    Issuer-->>Wallet: Skydiving licence credential
    Wallet->>Wallet: Verify issuer signature, store licence
    Wallet-->>Student: Licence in wallet
    Issuer->>Register: Mark credential issued (status list index)
```

## Where trust is decided

| Decision | Made by | On the basis of |
| --- | --- | --- |
| This really is Swiss Skydive asking for my e-ID | Wallet | Verifier DID and trust statement in the Trust Registry |
| This person is the one who passed the test | Swiss Skydive | Match of e-ID claims against the facility's report |
| The student may hold a licence | Swiss Skydive | Test result, membership, fee — its own rules, outside swiyu |
| This really is Swiss Skydive issuing | Wallet | Issuer DID and trust statement in the Trust Registry |
| The licence can only be used from this wallet | Issuer, later every verifier | `cnf` holder key and key binding JWT |

## Assumptions

- Matching the e-ID to the facility's report on name and date of birth is
  enough. If two students share both, the licence register needs a further
  key, such as the Swiss Skydive member number, entered by the student.
- The facility keeps reporting through Swiss Skydive's existing channel. A
  later version could have the facility issue a "proficiency test passed"
  credential that the student presents together with the e-ID, which removes
  the matching step entirely.
- Licence fee and membership are handled in the member area as today.
