# Unlinkable e-ID Use

A reusable building block and a walkthrough that composes it with sector flows.

> Not an official flow of the swiyu team or any other authority — published without
> warranty. Work in progress, for discussion purposes only.

## Flows

- [Unlinkable presentation of the e-ID](./unlinkable-presentation.md): the
  reusable block. One verifier requests a set of claims; the wallet presents an
  unused credential of the e-ID batch with only those claims. It requires
  `eid-held` and establishes `age-attribute-proven` or `identity-verified`. The
  page records the mechanisms behind
  [unlinkability](https://didas-swiss.github.io/didas-glossary/#term:unlinkability)
  with their sources, the e-ID governance and the general open points.
- [Six-verifier walkthrough](./six-verifier-walkthrough.md): one guest uses the
  block at a nightclub, a hotel, Coop, a vending machine, an adult website and
  Swisscom.

## How the flows compose

```
basic-flow/trust-infrastructure
    -> basic-flow/unlinkable-presentation              via eid-held
basic-flow/unlinkable-presentation
    -> food-and-beverage/venue-entry                   via age-attribute-proven
    -> retail/age-restricted-sale                      via age-attribute-proven
    -> accommodation/guest-registration                via identity-verified
    -> telecommunications/subscriber-identification    via identity-verified
```

`python3 scripts/check-classification.py` derives this chain from the `requires`
and `establishes` states in each `sector.yaml`. A new age-gated flow in any
sector plugs into the block by requiring `age-attribute-proven`.

## Use cases

| Verifier | Sector flow | Use case |
| --- | --- | --- |
| Nightclub | [Nightclub entry](../../food-and-beverage/nightclub-entry.md) | [#4 Check age before selling restricted goods](https://github.com/DIDAS-swiss/use-case-repository/issues/4) |
| Hotel | [Hotel check-in](../../accommodation/hotel-check-in.md) | [#70 Use accepted identity data at hotel check-in](https://github.com/DIDAS-swiss/use-case-repository/issues/70) |
| Coop | [Coop beer sale](../../retail/coop-beer-sale.md) | [#4 Check age before selling restricted goods](https://github.com/DIDAS-swiss/use-case-repository/issues/4) |
| Cigarette vending machine | [Cigarette vending machine](../../retail/cigarette-vending-machine.md) | [#5 Check adulthood before dispensing tobacco](https://github.com/DIDAS-swiss/use-case-repository/issues/5) |
| Adult website | none yet: NOGA division not decided | No use case yet |
| Swisscom | [SIM registration](../../telecommunications/sim-registration.md) | [#71 Verify identity before activating a mobile service](https://github.com/DIDAS-swiss/use-case-repository/issues/71) |

## Contributors

- Daniel Säuberli
