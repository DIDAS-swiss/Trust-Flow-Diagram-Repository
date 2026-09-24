# Sport

Trust flows for sport: a skydiving licence issued by
[Swiss Skydive](https://home.swissskydive.org/) into the swiyu wallet, a reserve
repack issued by a licensed rigger, certificates for riggers and accident
experts, and licence and repack presented together with the proof of
insurance at a drop zone before a jump. The insurance itself is taken out with
the licence, in [`insurance/`](../insurance).

> Not an official flow of the swiyu team, Swiss Skydive or any other authority —
> published without warranty. Work in progress, for discussion purposes only.
> The licence process shown here follows what Swiss Skydive publishes about
> [the way to the licence](https://home.swissskydive.org/der-weg-zur-fallschirmlizenz).
> Anything not stated there is marked as an assumption and needs confirming with
> Swiss Skydive.

## Contributors

- Daniel (DIDAS)

---

## The use case

In Switzerland there is one skydiving licence rather than the A, B, C and D
ladder of the USPA. A student completes the AFF course at a training facility
certified by Swiss Skydive, logs at least 25 jumps, passes the theory exam and
the proficiency test, and then applies to Swiss Skydive for the licence. With
it they may jump unsupervised at the drop zones approved by the Federal Office
of Civil Aviation (FOCA / BAZL), and it is recognised abroad as an FAI licence.

Today the licence is a card and an entry in the Swiss Skydive member area. At a
drop zone, especially a foreign one, manifest staff look at the card and the
logbook and take the rest on trust. A verifiable credential lets them check,
in a few seconds and without calling Switzerland, that the licence was issued
by Swiss Skydive, belongs to the person in front of them and has not been
suspended. The same holds for the two other things manifest asks about: is the
jumper insured, and was the reserve repacked within the last year.

## Actors

| Actor | Role in swiyu terms | What it does here |
| --- | --- | --- |
| Skydiver | Holder | Holds the e-ID and, afterwards, the licence in the swiyu wallet |
| Training facility | — (existing process) | Trains the student, conducts the proficiency test, reports the result |
| Swiss Skydive | Issuer, and verifier of the e-ID | Checks applications; issues and manages the licence, rigger licences, accident expert certificates and repack credentials |
| Rigger | Holder of a rigger licence, in levels | Repacks the reserve and has the repack credential issued to the rig owner |
| Tandem master | Holder of a tandem master credential | Flies tandem passengers; presents the credential before tandem loads |
| Accident expert | Holder of an accident expert certificate | Investigates accidents for Swiss Skydive, shows the certificate at the scene |
| Insurer | Verifier of the licence, issuer of the proof of insurance | Sells cover on the strength of the licence ([`insurance/`](../insurance)) |
| Drop zone | Verifier | Checks licence, insurance and repack together at manifest |
| swiyu trust infrastructure | Base Registry and Trust Registry | Resolves DIDs, hosts the status list, vouches that a DID belongs to Swiss Skydive |

The trust infrastructure is abstracted to single steps below. What happens
inside "the wallet checks the issuer" is shown in [`basic-flow/`](../basic-flow).

## Flows

| Flow | Family | What it shows |
| --- | --- | --- |
| [Licence issuance](./licence-issuance.md) | `skydiving-licence` | Proficiency test passed → e-ID presented to Swiss Skydive → licence issued over OID4VCI |
| [Licence lifecycle](./licence-lifecycle.md) | `skydiving-licence` | Adding a rating, correcting data, suspending and withdrawing through the status list |
| [Tandem master](./tandem-master.md) | `skydiving-licence` | Swiss Skydive rating plus manufacturer system ratings, renewed every year on the activity report |
| [Specialist qualifications](./specialist-qualifications.md) | `skydiving-licence` | Rigger licences by level, accident expert certificates, and showing one at an accident |
| [Skydiving insurance](../insurance/README.md) | `insurance/sport-liability-cover` | Licence presented to an insurer → proof of insurance issued |
| [Reserve repack](./reserve-repack.md) | `reserve-repack` | Rigger signs in with the rigger licence, repacks, owner receives a repack credential valid for one year |
| [Manifest check-in](./manifest-check-in.md) | `drop-zone-check-in` | Licence, insurance and repack checked in one manifest session; tandem master before tandem loads |

**[Implementing on swiyu](./swiyu-implementation.md)** checks these flows
against the swiyu specifications and code as of September 2026 and proposes
the implementation path: components, onboarding, credential types, and what
is blocked today — notably that one request cannot yet carry several
credentials.

The families are joined by their states, and the check derives the chain:

```
basic-flow/trust-infrastructure
    -> sport/skydiving-licence              via eid-held
sport/skydiving-licence
    -> insurance/sport-liability-cover      via qualification-credential-held
    -> sport/reserve-repack                 via qualification-credential-held  (the rigger licence)
    -> sport/drop-zone-check-in             via qualification-credential-held
insurance/sport-liability-cover
    -> sport/drop-zone-check-in             via insurance-cover-held
sport/reserve-repack
    -> sport/drop-zone-check-in             via equipment-inspection-current
```

The states are deliberately not skydiving-specific. The same sockets take a
pilot licence, a diving certification, a boat's safety inspection or a
mountain guide's diploma.

## The licence credential

Modelled on what Swiss Skydive shows today. `dc+sd-jwt` as the swiyu Swiss
Profile requires, with every business claim selectively disclosable; the
protected claims are set by the issuer.

### Today: the member lookup

Swiss Skydive publishes a **Find a Member** lookup
([SSDProfiles](https://swissskydive.org/dax/apps/SSDService/?SSDProfiles)).
Anyone who enters a last name and a licence number sees that member's current
licence and insurance:

| Field in the lookup | Meaning |
| --- | --- |
| Lastname*, SSD-License* | Mandatory search keys. Licence number is a plain number (e.g. `4567`) |
| Firstname, SSDID, Gender | Optional. SSDID is the member number, distinct from the licence number |
| Result: Date · Description · Expire | One row per current entitlement, e.g. `19.09.2026 · Skydiver Licence · 31.03.2027` and `18.09.2026 · Skydiving third party liability insurance CHF 3 Mio · 31.03.2027` |
| Licence `0` | Shows the AXA parachute insurance of someone without a Swiss Skydive licence |

Three things follow for the credential:

- **The licence is annual.** It is issued for the season and expires on
  **31 March** of the following year. It is not valid until withdrawn.
- **The date on the row is the date of this year's licence**, not the date the
  holder first qualified.
- **Today's check is a public lookup.** Whoever knows a name and a licence
  number can see licence and insurance status, and the drop zone needs a
  connection to check. The credential turns this into a check the holder
  consents to, which works offline and cannot be run against someone who is
  not present. The lookup can stay as a fallback for foreign drop zones.

Other public facts:

| | |
| --- | --- |
| Issued by | Swiss Skydive, after the proficiency test of the Swiss Skydive Education System (SES), on application |
| FAI | FAI Certificates of Proficiency keep one country and one number across levels. Whether Swiss Skydive prints A–D levels was not found |
| Legal frame | The VLK (SR 748.941) regulates parachute jumps (jumpmaster, airspace, insurance). No state licence for sport skydivers was found; the licence is the association's |

### The licence credential

| Claim | Example | Disclosure | From today |
| --- | --- | --- | --- |
| `vct` | `https://swissskydive.org/vc/skydiving-licence/v1` | protected | — (placeholder URL) |
| `iss` | `did:webvh:…` | protected | — Swiss Skydive's issuer DID |
| `licence_number` | `1234` | selective | SSD-License |
| `member_id` | `987` | selective | SSDID. Only disclosed where the member relationship matters |
| `licence_type` | `Skydiver Licence` | selective | Description |
| `family_name`, `given_name` | `Muster`, `Anna` | selective | Lastname, Firstname; checked against the e-ID at first issuance |
| `birth_date` | `1994-03-07` | selective | From the e-ID |
| `portrait` | `data:image/jpeg;base64,…` | selective | — Optional. Lets manifest staff match face to licence |
| `valid_from` | `2026-09-19` | selective | Date |
| `expiry_date` | `2027-03-31` | selective | Expire. The wallet shows "Expired" after it |
| `exp` | `2027-03-31` | protected | — Set via `credential_valid_until`; an expired licence cannot be presented |
| `endorsements` | `["wingsuit"]` | selective | — Assumption: only if Swiss Skydive records endorsements without rules of their own. Functions — tandem master, jumpmaster, AFF instructor, rigger — are separate credentials |
| `status` | status list reference | protected | — 2-bit list, for suspension and withdrawal during the season |
| `cnf` | holder public key | protected | — Binds the licence to the wallet |

Gender is a field in the lookup but is not in the credential: nothing
downstream needs it.

Deliberately **not** in the credential:

- **Jump count and last jump date.** They change with every jump and belong in
  the logbook. Currency is a drop zone rule, not a property of the licence.
- **Insurance.** Its own product, bought separately, possibly without a
  licence at all. It is a separate credential that names the
  `licence_number`, and in practice runs to the same 31 March.
- **Reserve repack.** It is about a rig, not a person, and has its own cycle.

## Open questions for Swiss Skydive

1. How does a training facility report a passed proficiency test today, and can
   that report become the trigger for the credential offer?
2. Which endorsements exist on the licence itself, as opposed to functions
   with their own validation?
3. Should the Aero-Club membership that active members also need be verified
   at application, or is it already known to Swiss Skydive?
4. Do foreign drop zones need anything beyond the licence, such as an IPC
   certificate number, that should be a claim?

## Sources

The semantics above were researched on 2026-09-23 and 2026-09-24. Primary
sources are Swiss Skydive's public member lookup and a reserve data card of
the kind in use. The Swiss Skydive directives are known by title from the
list its Safety Management System gives (01-00 to 01-11, among them 01-03
skydiver, 01-04 jumpmaster, 01-05 tandem, 01-06 AFF, 01-07 instructor, 01-08
assistants with a foreign licence, 01-09 master and senior rigger, 01-10
experts, 01-11 tandem operation), but their content could not be read and
should be checked against the flows before anything is built.

- Swiss Skydive: [Find a Member lookup](https://swissskydive.org/dax/apps/SSDService/?SSDProfiles), [document catalogue](https://swissskydive.org/dax/apps/SSDService/?SSDDownloads=)
- Reserve data card: [Parachute Record Log card](https://xdsports.uk/images/thumbs/000/0002170_reserve-log-cards.png)
- Swiss Skydive: [the way to the licence](https://home.swissskydive.org/der-weg-zur-fallschirmlizenz), [FAQ](https://home.swissskydive.org/faq), [Ausbildungskonzept 00-08d](https://swissskydive.org/dax/share/ssd/documents/00-08d_SSD_Ausbildungskonzept.pdf), [PAC 01-06f](https://swissskydive.org/dax/share/ssd/documents/01-06f_PAC.pdf), [Safety Management System 05-01d](https://swissskydive.org/dax/share/ssd/documents/05-01d_SafetyManagementSystem.pdf)
- FAI: [Certificates of Proficiency](https://www.fai.org/page/certificates-proficiency)
- VLK, [SR 748.941](https://www.fedlex.admin.ch/eli/cc/2022/802/de)
- Reserve data card and seals: [14 CFR 65.131](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-65/subpart-F/section-65.131), [14 CFR 65.133](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-65/subpart-F/section-65.133), [14 CFR 105.43](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-105/subpart-C/section-105.43), [British Skydiving Form 215](https://britishskydiving.org/)
- AAD service life: [CYPRES](https://www.cypres.aero/hrf_faq/overview-maintenance-scheduling-and-service-life/), [Vigil](https://www.vigil.aero/support-faq)
- Tandem: [UPT Sigma tandem operations manual](https://uptvector.com/wp-content/uploads/2025/12/Man016-Rev0-Sigma-Tandem-Operations-Manual.pdf), [Strong currency requirements](https://strongparachutes.com/Tandem/Instructors/Currency-Requirements)
- swiyu: see [implementing on swiyu](./swiyu-implementation.md) for repositories and commits
