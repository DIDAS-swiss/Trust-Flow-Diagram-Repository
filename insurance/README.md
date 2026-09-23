# Insurance

Trust flows in which an insurer is the relying party: it verifies a credential
before taking on a risk, and issues proof of cover afterwards.

> Not an official flow of the swiyu team, any insurer or any other authority —
> published without warranty. Work in progress, for discussion purposes only.

## Contributors

- Daniel (DIDAS)

---

## Skydiving insurance with the licence

A skydiver buys liability cover by presenting the skydiving licence from
[`sport/`](../sport), and receives a proof of insurance as a credential. At
the drop zone it is checked together with the licence and the reserve repack
([manifest check-in](../sport/manifest-check-in.md)).

Status: **draft**.

**Requires** `qualification-credential-held` · **Establishes** `insurance-cover-held`

### Today

| | | Source |
| --- | --- | --- |
| Legal minimum | The VLK (SR 748.941) requires third-party liability insurance for damage on the ground of at least CHF 1 million, and the insurance certificate must be carried on the jump | VLK, read from a search excerpt; article not verified |
| Where skydivers buy it | Swiss Skydive sells **day insurance** and **annual insurance** online; cover starts when payment is complete. Annual insurance requires active Swiss Skydive membership, which in turn requires Aero-Club membership | Swiss Skydive FAQ |
| Where it shows | In the Swiss Skydive member area, next to the valid licence | Swiss Skydive FAQ |
| At the drop zone | Licence, reserve data card, logbook and insurance under Swiss law are checked. Some drop zones ask foreign jumpers for at least CHF 3 million | Drop zone websites |
| Insurer behind the policy | **Not found** | |

So the issuer in practice is most likely **Swiss Skydive**, selling a policy
underwritten by an insurer. The flow shows it that way. An insurer selling
directly would run the same flow with its own DID, and each drop zone would
have to accept that DID as well.

### Flow

```mermaid
%%{init: {"theme": "default", "themeVariables": {"fontFamily": "Inter, Arial"}}}%%
sequenceDiagram
    actor Jumper as 👤 Skydiver

    box rgb(220,235,255) Skydiver's device
        participant Wallet as 🪪 swiyu Wallet
        participant Browser as 🌐 Browser
    end

    box rgb(220,255,220) Swiss Skydive (for the insurer)
        participant Shop as 🛒 Insurance shop
        participant Verifier as ✅ swiyu Verifier
        participant Policy as 📄 Policy system
        participant Issuer as 🏷️ swiyu Issuer
    end

    box rgb(255,235,210) swiyu trust infrastructure
        participant Trust as 🛡️ Base & Trust Registry
    end

    Note over Jumper,Trust: Phase 1 — Present the licence
    Jumper->>Browser: "Day insurance for Saturday" or "annual insurance"
    Browser->>Shop: Start
    Shop->>Verifier: Verification (DCQL): licence —<br/>licence_number, family_name, given_name, birth_date
    Verifier-->>Browser: QR code / deep link
    Jumper->>Wallet: Scan
    Wallet->>Trust: Resolve verifier DID, trust statement
    Trust-->>Wallet: Swiss Skydive — verified identity
    Wallet-->>Jumper: Swiss Skydive asks for licence number, name, date of birth
    Jumper->>Wallet: Consent
    Wallet->>Verifier: VP token (direct_post.jwt) + key binding
    Verifier->>Trust: Swiss Skydive key, status list
    Verifier->>Verifier: Signature, key binding, status valid (reject suspended)
    Verifier-->>Shop: Licensed skydiver
    opt Tandem cover
        Shop->>Verifier: Second verification: tandem master credential
        Verifier-->>Shop: Tandem master, valid until 2027-03-31
    end

    Note over Jumper,Trust: Phase 2 — Contract
    Shop->>Shop: Annual: check membership. Day: no membership needed
    Shop-->>Browser: Premium, terms
    Jumper->>Browser: Accept, pay
    Browser->>Policy: Conclude policy
    Policy-->>Shop: Policy number, cover period

    Note over Jumper,Trust: Phase 3 — Proof of insurance (OID4VCI)
    Shop->>Issuer: Create offer: policy claims, licence_number,<br/>credential_valid_until = end of cover
    Issuer-->>Browser: Credential offer (deep link, same device)
    Jumper->>Wallet: Open
    Wallet->>Trust: Resolve issuer DID, trust statement
    Wallet->>Issuer: Token (DPoP), credential request + proof of possession
    Issuer-->>Wallet: Proof of insurance (dc+sd-jwt)
    Wallet-->>Jumper: "Skydiving insurance valid until 2027-09-22"
```

The licence is presented once, when buying. The insurer does not need it
again for the proof to stay valid: the proof names the `licence_number`, and
the drop zone matches the two.

### The proof of insurance

| Claim | Example | Notes |
| --- | --- | --- |
| `vct` | `https://swissskydive.org/vc/skydiving-insurance/v1` | Placeholder. One shared type across insurers would let drop zones accept any of them |
| `policy_number` | `SK-2026-000184` | |
| `product` | `annual` or `day` | |
| `cover` | `["third-party-liability"]`, optionally `"accident"`, `"tandem-passengers"` | What is covered |
| `liability_sum` | `3000000` (CHF) | Drop zones compare it with their minimum; the law asks for at least CHF 1 million |
| `territory` | `worldwide` | Matters at foreign drop zones |
| `valid_from` | `2026-09-23` | |
| `exp` (protected) | `2027-09-22` | Set via `credential_valid_until`. For day insurance, the same day. After it the wallet will not present the proof |
| `licence_number` | `CH-12345` | Links the cover to the licence it was bought with |
| `family_name`, `given_name`, `birth_date` | | From the licence |
| `insurer` | name of the underwriting insurer | Human-readable; trust rests on the issuer DID |
| `status` (protected) | 1-bit list | Cancellation during the term |
| `cnf` (protected) | holder key | |

The link between licence and insurance is `licence_number`, not the holder
key: wallets use a fresh key per credential, so the drop zone cannot rely on
the two carrying the same `cnf`.

Day insurance fits swiyu's whole-day validity exactly: `exp` is the jump
day, and the proof cannot be presented the day after.

### Assumptions and open questions

1. Which insurer underwrites Swiss Skydive's day and annual insurance, and may
   Swiss Skydive issue the proof in its name?
2. Does a proof in the wallet satisfy the VLK's duty to carry the insurance
   certificate on the jump? That is a question for FOCA.
3. What cover and minimum sum apply to commercial tandem jumps?
4. Cancellation during the term is revoked through the status list. Expiry
   needs no revocation.
