---
id: coop-beer-sale
title: Coop beer sale
kind: flow
interaction_scope: multi-party
composition: composed
built_from:
  - basic-flow/unlinkable-presentation
data_mode: discrete
status: specified
requested_claims: age_over_16
preconditions:
  - age-attribute-proven
produces:
  - restricted-sale-permitted
use_cases:
  - https://github.com/DIDAS-swiss/use-case-repository/issues/4
---

# Coop beer sale

At the Coop checkout, the customer buys beer. The checkout requests only `age_over_16`, the legal limit for beer, and learns nothing that identifies the customer.

The presentation step is the [unlinkable presentation](../basic-flow/Unlinkable%20e-ID%20use/unlinkable-presentation.md) block.
This flow adds what is specific to the Coop checkout: the claims it requests, the legal
basis and what follows. It is step 4 of the [six-verifier walkthrough](../basic-flow/Unlinkable%20e-ID%20use/six-verifier-walkthrough.md).

Use case: [#4](https://github.com/DIDAS-swiss/use-case-repository/issues/4).

## Diagram

```mermaid
sequenceDiagram
    autonumber
    participant W as Holder (swiyu wallet)
    participant V as Coop checkout
    V->>W: Request age_over_16 only
    Note over W,V: Unlinkable presentation block (basic-flow)
    W->>V: Presentation: age_over_16 only
    V->>V: Beer sold
```

## Interface

| | State |
| --- | --- |
| Requires | `age-attribute-proven`, established by the unlinkable presentation block |
| Establishes | `restricted-sale-permitted` |

## Legal basis

| Rule | Content | Basis |
| --- | --- | --- |
| Beer and wine | No supply to persons under 16 | LMG [Art. 14 para. 1](https://www.fedlex.admin.ch/eli/cc/2017/62/de#art_14) |
| In-person alternative | Whoever accepts the e-ID must also accept an identity document when the holder appears in person | BGEID [Art. 25](https://www.fedlex.admin.ch/eli/fga/2025/20/de#art_25), not yet in force |

Read on Fedlex on 2026-11-11 in the version in force on that day, for the
BGEID in the referendum text.

## Open points

1. **Product-dependent threshold.** The checkout has to request the threshold of the product: 16 for beer and wine, 18 for spirits and tobacco, or a stricter local rule ([#4](https://github.com/DIDAS-swiss/use-case-repository/issues/4)).
