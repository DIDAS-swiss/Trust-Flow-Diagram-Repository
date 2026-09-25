# Reserve repack

A senior or master rigger inspects and repacks the reserve of a rig,
certifies its airworthiness, and has a repack credential issued into the
owner's swiyu wallet. It is valid for the repack cycle — **12 months** in this
flow — from the packing date. At manifest it lets the drop zone check the repack
without anyone opening the container to read the data card.

Status: **draft**.

**Requires** `qualification-credential-held` (the rigger licence, see [specialist qualifications](./specialist-qualifications.md)) · **Establishes** `equipment-inspection-current`

## Today: the data card in the rig

Every rig carries a **Parachute Record Log** — the reserve data card — in a
pocket of the container. It is the permanent record of the rig and follows it
through changes of owner. The fields below are those of the card in use
(PIA-style layout, as sold for example by [XD Sports](https://xdsports.uk/images/thumbs/000/0002170_reserve-log-cards.png)):

| Section | Fields on the card |
| --- | --- |
| Header | "For legal use in aircraft. This parachute must be inspected and maintained in accordance with all applicable manufacturer's instructions and aviation laws. **Repack cycle ___ days.**" |
| Never exceed — reserve canopy limitations | **Maximum exit weight** (jumper + clothing + equipment) ___ lbs; **maximum deployment speed** ___ kts |
| Owner information | Name, address, city/state/zip, telephone |
| Equipment data | For **reserve canopy**, **harness & container** and **AAD**: manufacturer, model, serial no., date of manufacture |
| Repack lines | **Date**, **place**, **certificate no. and seal**, **rigger's signature**, **remarks** |

The seal on the reserve closing loop carries the rigger's personal seal
symbol, and the same symbol goes into the "certificate no. and seal" column.
An intact seal with that symbol on the card is how anyone can see that nobody
has opened the reserve since. Two things are worth noting:

- **The repack cycle is written on the card**, in days. Swiss Skydive does not
  fix one: "the packing cycle for the reserve is set by the manufacturer"
  (01-00d 10.02). The credential takes it from the card: 365 days in this
  flow.
- **The canopy limitations** are what a drop zone would need to check wing
  loading on the reserve: the jumper's exit weight must stay below the
  maximum. The credential carries them so the check can be made.

## What Swiss Skydive requires

Directive **01-09d** (valid from June 2025) and **01-00d 10** set what goes
on the card and when a rigger may certify:

| Requirement | Rule | § |
| --- | --- | --- |
| Who | Harness, reserve and AAD are maintained and packed only by a **senior or master rigger**, following the manufacturers' manuals | 01-00d 10.01 |
| Cycle | Set by the manufacturer | 01-00d 10.02 |
| Card on every system | Signed by the senior or master rigger | 01-00d 10.03 |
| **Packing card must show** | a) owner's name; b) reserve: manufacturer, type, serial, date of manufacture; c) harness: the same; d) AAD: the same plus **dates of battery changes and periodic checks**; e) **packing date and validity period**; f) packing place; g) rigger's **signature and ID number** | 01-09d 01.06 |
| **SSD seal** | The responsible rigger's symbols assigned by Swiss Skydive | 01-09d 01.06 |
| Certifying airworthiness | Only with valid Swiss Skydive licences; the whole system checked; repairs done professionally; every part inspected; **service life not exceeded** (an exception must be defined, documented and signed by the rigger) | 01-09d 01.05 |
| Approval | Reserve and harness need an FAA-TSO, E-TSO or equivalent TSO; the manufacturer's warning label must be on harness and reserve, or the system loses its airworthiness | 01-09d 01.04 c, 01-00d 10.05 |
| Rigger book | Every job recorded, kept ≥ 5 years | 01-09d 01.07 |
| AAD mandatory | For students, tandem rigs and jumps above 5,000 m ASL | 01-00d 01.08, 01.10, 08.01 |

The printed international card has no column for AAD battery and check dates
or for the validity period; Swiss riggers write them in. The credential gives
each its own claim.

## What changes and what does not

| | Paper data card | Repack credential |
| --- | --- | --- |
| Lives | In the rig | In the owner's wallet |
| History | All repacks since manufacture | The current repack; older ones have expired |
| Read by | Whoever opens the pocket | A verifier, with the owner's consent |
| Protection against forgery | Signature and seal symbol | Swiss Skydive's signature, rigger named |
| Rig sold | Card goes with the rig | Credential stays with the seller; see below |

**The card stays.** The credential is issued alongside the card line, not
instead of it. The card is the rig's record; the credential is the owner's
proof towards a drop zone. Dropping the card is a decision for the rules,
not for this flow.

## Who signs the credential

The rigger does, in substance; Swiss Skydive does, technically. swiyu issuers
are single-tenant ([implementing on swiyu](./swiyu-implementation.md#issuance)),
and a drop zone should have to trust one DID for repacks, not one per rigger.
So the rigger signs in to a **rigger app** with their own rigger licence, the
licence register checks that the rigger licence is valid and its rating
(R or F) covers the reserve, and Swiss
Skydive's issuer signs a credential that names the rigger.

| | Swiss Skydive signs, rigger named (this flow) | Each rigger signs |
| --- | --- | --- |
| Issuer DIDs a drop zone trusts | One | One per rigger |
| Rigger licence withdrawn | Swiss Skydive refuses their next repack at once | Every drop zone must learn it |
| Licence and rating check | At issuance, by the licence register | By every verifier |
| swiyu today | Works: one issuer, management API | Every rigger would run an issuer and onboard a DID |

## Flow

```mermaid
%%{init: {"theme": "default", "themeVariables": {"fontFamily": "Inter, Arial"}}}%%
sequenceDiagram
    actor Owner as 👤 Rig owner
    actor Rigger as 🧵 Rigger

    box rgb(220,235,255) Owner's device
        participant OWallet as 🪪 Owner's swiyu Wallet
    end

    box rgb(220,235,255) Rigger's devices
        participant RWallet as 🪪 Rigger's swiyu Wallet
        participant App as 💻 Rigger app
    end

    box rgb(220,255,220) Swiss Skydive
        participant Verifier as ✅ swiyu Verifier
        participant Register as 🗂️ Licence register
        participant Issuer as 🏷️ swiyu Issuer
    end

    box rgb(255,235,210) swiyu trust infrastructure
        participant Trust as 🛡️ Base & Trust Registry
    end

    Note over Owner,Trust: Phase 1 — Rigger signs in with the rigger licence
    Rigger->>App: Open rigger app
    App->>Verifier: Verification: rigger licence<br/>(number, name, level, seal_symbol)
    Verifier-->>App: QR code
    Rigger->>RWallet: Scan, consent
    RWallet->>Verifier: VP token + key binding
    Verifier->>Trust: Swiss Skydive key, status list
    Verifier->>Verifier: Valid, not suspended
    Verifier-->>App: Rigger R-0471, senior rigger, seal symbol K7

    Note over Owner,Trust: Phase 2 — Inspect and repack, as today
    Owner->>Rigger: Hand over rig
    Rigger->>Rigger: Inspect, repack reserve, check AAD service dates
    Rigger->>Rigger: Seal with symbol K7, fill in the card line, sign
    Rigger->>App: Record from the card: equipment data, limitations,<br/>repack cycle, date, place, remarks

    Note over Owner,Trust: Phase 3 — Credential for the owner (OID4VCI)
    App->>Register: Submit repack record
    Register->>Register: Rigger licence valid, rating covers the reserve (F for ram-air),<br/>TSO, service life and AAD dates within limits
    Register->>Issuer: POST /management/api/credentials<br/>claims, credential_valid_until = packing date + repack_cycle_days
    Issuer-->>Register: Offer deep link, short validity
    Register-->>App: Offer
    App-->>Owner: QR code, shown in person
    Owner->>OWallet: Scan
    OWallet->>Trust: Resolve issuer DID, trust statement
    Trust-->>OWallet: Swiss Skydive — verified identity
    OWallet->>Issuer: Token (DPoP), credential request + proof of possession
    Issuer-->>OWallet: Reserve repack credential (dc+sd-jwt)
    OWallet-->>Owner: "Reserve repacked, valid until 2027-09-23"
    Rigger->>Owner: Return rig
```

The offer is shown to the owner in person with a short validity (a few
minutes). swiyu offers have no transaction code today, so whoever scans the
QR code first gets the credential; showing it only to the owner is the
protection.

## The repack credential

Every claim selectively disclosable. Dates are ISO dates.

| Claim | Example | From the data card |
| --- | --- | --- |
| `vct` | `https://swissskydive.org/vc/reserve-repack/v1` | — (placeholder URL) |
| `container_manufacturer`, `container_model`, `container_serial`, `container_dom` | `UPT`, `Vector 3`, `V3-24-01873`, `2024-03` | Equipment data: harness & container |
| `reserve_manufacturer`, `reserve_model`, `reserve_serial`, `reserve_dom` | `PD`, `Reserve 160`, `R-55621`, `2024-01` | Equipment data: reserve canopy |
| `aad_manufacturer`, `aad_model`, `aad_serial`, `aad_dom` | `Airtec`, `CYPRES 2`, `C2-99812`, `2023-11` | Equipment data: AAD |
| `aad_battery_changes`, `aad_periodic_checks` | `["2027-11"]`, `[]` | Required on the Swiss card (01-09d 01.06 d) |
| `tso` | `{"reserve": "TSO-C23d", "harness": "TSO-C23d"}` | Required for airworthiness (01-09d 01.04 c) |
| `service_life_extension` | — | Only if the rigger extended a system past its service life; the documented conditions (01-09d 01.05 f) |
| `reserve_max_exit_weight_lbs` | `254` | Never exceed: maximum exit weight. Kept in lbs as on the card |
| `reserve_max_deployment_speed_kts` | `150` | Never exceed: maximum deployment speed |
| `repack_cycle_days` | `365` | Header: repack cycle |
| `packing_date`, `packing_place` | `2026-09-23`, `Beromünster` | Repack line: date, place |
| `rigger_name`, `rigger_licence_number`, `rigger_level` | `Max Beispiel`, `R-0471`, `senior-rigger` | Repack line: signature and ID number (01-09d 01.06 g) |
| `seal_symbol` | `K7` | SSD seal: the symbols Swiss Skydive assigned to the rigger |
| `remarks` | `inspected and repacked` | Repack line: remarks, including any defects found |
| `aad_next_service`, `aad_end_of_life` | `2028-11`, `2039-05` | Not on the card's columns; derived from the AAD model and date of manufacture (CYPRES 2 built from 2017: optional service at 5 and 10 years, 15.5-year life; Vigil: 20-year life) |
| `expiry_date` | `2027-09-23` | Validity period (01-09d 01.06 e): packing date + `repack_cycle_days`; the wallet shows "Expired" after it |
| `exp` (protected) | `2027-09-23` | — set via `credential_valid_until`; after it the wallet will not present the credential |
| `status`, `cnf` (protected) | | Status list; bound to the owner's wallet |

`expiry_date` and `exp` fall on the same day. `expiry_date` gives the wallet
something to show; `exp` makes an overdue reserve impossible to present.
The validity is computed from `repack_cycle_days`, as the card does: 365
days in this flow. A rig under a foreign country's shorter cycle (6 months in
the UK, 180 days in the US) gets its own value, with nothing else changing.

Owner information stays on the card and out of the credential: the holder
binding already says whose it is, and address and telephone are not a drop
zone's business.

The AAD is on the credential because manifest looks for it today, and because
an AAD past its service date or end of life makes the repack pointless. If
AAD services turn out to be done by other people at other times, the AAD
becomes its own credential.

## Edge cases

- **Rig sold.** The card goes with the rig; the credential does not. On the
  seller's request Swiss Skydive revokes it, and the buyer either has the
  reserve repacked or asks the rigger who packed it to issue the buyer a
  credential for the same repack, with the same `expiry_date`.
- **Several rigs.** One credential per rig. The wallet lets the jumper pick
  the rig at manifest; the drop zone matches `container_serial`.
- **Drop zone rigs.** Student and tandem rigs belong to the drop zone. Their
  repack credentials sit in the drop zone's own wallet or its records; the
  jumper does not present them.
- **Faulty repack found.** Swiss Skydive revokes the credential; the rig
  needs a new repack.
- **Seal broken.** Nothing digital knows. The reserve is repacked and a new
  credential issued; staff still look at the seal.

## Open questions

1. Tandem rigs: 01-09d has no tandem-specific rule, the manufacturers do.
   See [tandem reserves](./tandem-reserves.md) for their requirements and the
   extra claims a tandem repack credential carries.
2. Is Swiss Skydive willing to sign on behalf of riggers it licenses but does
   not employ?
