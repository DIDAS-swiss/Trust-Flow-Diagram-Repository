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
| [Specialist qualifications](./specialist-qualifications.md) | `skydiving-licence` | Rigger licences by level, accident expert certificates, and showing one at an accident |
| [Skydiving insurance](../insurance/README.md) | `insurance/sport-liability-cover` | Licence presented to an insurer → proof of insurance issued |
| [Reserve repack](./reserve-repack.md) | `reserve-repack` | Rigger signs in with the rigger licence, repacks, owner receives a repack credential valid for one year |
| [Manifest check-in](./manifest-check-in.md) | `drop-zone-check-in` | Licence, insurance and repack presented together in one OID4VP request |

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

A proposal, to be settled with Swiss Skydive. SD-JWT VC, with every claim
below selectively disclosable except the ones marked.

| Claim | Example | Disclosure | Notes |
| --- | --- | --- | --- |
| `vct` | `https://swissskydive.org/vc/skydiving-licence/v1` | always | Credential type. The URL is a placeholder |
| `iss` | `did:tdw:…swissskydive…` | always | Swiss Skydive's DID, registered in the Base Registry |
| `licence_number` | `CH-12345` | selective | The number on today's card |
| `licence_type` | `FAI Certificate of Proficiency` | selective | One Swiss licence; kept as a field so the schema does not break if that changes |
| `family_name`, `given_name` | `Muster`, `Anna` | selective | Copied from the e-ID at application |
| `birth_date` | `1994-03-07` | selective | Copied from the e-ID |
| `portrait` | JPEG | selective | Optional. Lets manifest staff match face to licence without a second credential |
| `issue_date` | `2026-09-23` | selective | Date the licence was first granted |
| `ratings` | `["tandem", "wingsuit"]` | selective | Assumption: ratings that change what the holder may jump. Rigger and accident expert are separate credentials, see [specialist qualifications](./specialist-qualifications.md) |
| `issuing_federation` | `Swiss Skydive` | selective | Human-readable; the trust decision rests on `iss`, not on this |
| `status` | status list reference | always | Token Status List index, for suspension and withdrawal |
| `cnf` | holder public key | always | Binds the licence to the wallet it was issued to |

Deliberately **not** in the credential:

- **Jump count and last jump date.** They change with every jump and belong in
  the logbook. Currency is a drop zone rule, not a property of the licence.
- **Insurance.** It has its own issuer and its own term, and mixing it in would
  force a re-issue of the licence every year. It is a separate credential that
  names the `licence_number` and is presented together with the licence.
- **Reserve repack.** It is about a rig, not a person, and expires after a year.
- **An expiry date**, unless Swiss Skydive licences actually expire. A licence
  that stays valid until withdrawn is modelled through the status list, not
  through `exp`.

## Open questions for Swiss Skydive

1. How does a training facility report a passed proficiency test today, and can
   that report become the trigger for the credential offer?
2. Does the licence expire, or is it valid until withdrawn?
3. Which ratings exist, and should they sit in the licence credential or in
   separate ones?
4. Should the Aero-Club membership that active members also need be verified
   at application, or is it already known to Swiss Skydive?
5. Is the insurance a group policy that comes with membership, so that Swiss
   Skydive issues the proof, or do skydivers buy it from insurers directly?
6. Do foreign drop zones need anything beyond the licence, such as an IPC
   certificate number, that should be a claim?
