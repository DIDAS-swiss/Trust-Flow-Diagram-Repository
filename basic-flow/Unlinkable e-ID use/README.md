# Unlinkable e-ID Use

One guest uses the same e-ID at a nightclub, a hotel, Coop, a cigarette vending
machine, an adult website and Swisscom. Each verifier receives only the
attributes it requests, and each presentation uses a different credential from
the e-ID batch, with its own key pair.

> Not an official flow of the swiyu team or any other authority — published without
> warranty. Work in progress, for discussion purposes only.

The six verifiers operate in different sectors, so the flow sits next to the
reference model whose privacy properties it shows.

## Flow

[Unlinkable e-ID use across verifiers](./unlinkable-e-id-use.md): sequence
diagram, who learns what, the swiyu mechanisms that keep the presentations
unlinked with their sources, governance and open points.

## Use cases

| Verifier | Use case |
| --- | --- |
| Nightclub, Coop | [#4 Check age before selling restricted goods](https://github.com/DIDAS-swiss/use-case-repository/issues/4) |
| Hotel | [#70 Use accepted identity data at hotel check-in](https://github.com/DIDAS-swiss/use-case-repository/issues/70) |
| Cigarette vending machine | [#5 Check adulthood before dispensing tobacco](https://github.com/DIDAS-swiss/use-case-repository/issues/5) |
| Swisscom | [#71 Verify identity before activating a mobile service](https://github.com/DIDAS-swiss/use-case-repository/issues/71) |
| Adult website | No use case yet |

## Contributors

- Daniel Säuberli
