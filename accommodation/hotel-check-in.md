---
id: hotel-check-in
title: Hotel check-in
kind: flow
interaction_scope: multi-party
composition: composed
built_from:
  - basic-flow/unlinkable-presentation
data_mode: discrete
status: specified
requested_claims: name, first names, date of birth, nationality
preconditions:
  - identity-verified
produces:
  - statutory-identification-recorded
use_cases:
  - https://github.com/DIDAS-swiss/use-case-repository/issues/70
---

# Hotel check-in

At check-in, the hotel fills in the guest registration form from the guest's e-ID. The guest presents only the four attributes the form needs.

The presentation step is the [unlinkable presentation](../basic-flow/Unlinkable%20e-ID%20use/unlinkable-presentation.md) block.
This flow adds what is specific to the hotel: the claims it requests, the legal
basis and what follows. It is step 3 of the [six-verifier walkthrough](../basic-flow/Unlinkable%20e-ID%20use/six-verifier-walkthrough.md).

Use case: [#70](https://github.com/DIDAS-swiss/use-case-repository/issues/70).

## Diagram

```mermaid
sequenceDiagram
    autonumber
    participant W as Holder (swiyu wallet)
    participant V as Hotel
    V->>W: Request name, first names, date of birth, nationality
    Note over W,V: Unlinkable presentation block (basic-flow)
    W->>V: Presentation: name, first names, date of birth, nationality
    V->>V: Checked in, registration form filled
```

## Interface

| | State |
| --- | --- |
| Requires | `identity-verified`, established by the unlinkable presentation block |
| Establishes | `statutory-identification-recorded` |

## Legal basis

| Rule | Content | Basis |
| --- | --- | --- |
| Guest registration | Commercial hosts report foreign guests to the cantonal authority on a registration form filled in from the identity document | AIG [Art. 16](https://www.fedlex.admin.ch/eli/cc/2007/758/de#art_16), VZAE [Art. 18 para. 1](https://www.fedlex.admin.ch/eli/cc/2007/759/de#art_18) |
| In-person alternative | Whoever accepts the e-ID must also accept an identity document when the holder appears in person | BGEID [Art. 25](https://www.fedlex.admin.ch/eli/fga/2025/20/de#art_25), not yet in force |

Read on Fedlex on 2026-11-11 in the version in force on that day, for the
BGEID in the referendum text.

## Open points

1. **Swiss guests.** AIG Art. 16 and VZAE Art. 18 apply to foreign guests. Cantonal rules for Swiss guests were not checked.
2. **Identity document.** VZAE Art. 18 para. 1 requires the form to be filled in from the identity document ("Ausweispapier"). Whether an e-ID presentation meets that requirement is open ([#70](https://github.com/DIDAS-swiss/use-case-repository/issues/70)). Most foreign tourists cannot obtain the e-ID, so the document-based route remains.
