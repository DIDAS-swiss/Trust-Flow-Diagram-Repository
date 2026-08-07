# trust-flows-e-id

Link to the Website [Trust Flow Diagram Repository](https://didas-swiss.github.io/Trust-Flow-Diagram-Repository/)

This repository shows **how trust and data move** in different real-world use cases of the Swiss e-ID. Each flow visualizes who exchanges what with whom, which protocols are used, and where trust decisions actually happen (wallet, verifier, relying party, identity provider etc.).

**Disclaimer:** These are not official flows of the swiyu team or any other authority. This applies in particular to the Basic Flow. This is a work in progress, for discussion purposes only — diagrams may be updated and republished over time as discussions continue and the trust flows evolve.

## Why this repo exists

The Swiss e-ID trust infrastructure looks similar on paper across use cases — issue a credential, hold it in a wallet, present it, verify it — but the details differ a lot depending on context. This repo collects concrete, worked examples so that "how does trust actually flow here and how do we implement the end-points" has a diagram to point to instead of a vague description.

## Structure

```
trust-flows-e-id/
├── basic-flow/     reference flow: the trust infrastructure itself
├── banking/         KYC, re-identification, 18-year-old re-identification
└── education/      issuance of a Maturitätszeugnis, university onboarding
```

### [`basic-flow/`](./basic-flow)
The reference model. It shows the trust infrastructure end-to-end — onboarding, issuance, and verification — including the underlying data, protocols, and cryptography.

**All other flows in this repo intentionally abstract some of these steps** (e.g. "the VC is verified" is shown as a single step). If you want to understand what actually happens inside a step like that, `basic-flow` is where to look.

This flow is modeled with [LikeC4](https://likec4.dev) and published as an interactive diagram:

**👉 Live diagram: https://didas-swiss.github.io/Trust-Flow-Diagram-Repository/basic-flow/**

(replace with your actual GitHub Pages URL once it's live — see [`basic-flow/README.md`](./basic-flow/README.md) for how it's built and deployed)

### [`banking/`](./banking)
Flows for KYC onboarding, re-identification, and re-identification of a user who was onboarded as a minor and has since turned 18.

### [`education/`](./education)
Flows for issuance of a Maturitätszeugnis (upper-secondary school leaving certificate) and for university onboarding using the e-ID and Maturitätszeugnis VC.

