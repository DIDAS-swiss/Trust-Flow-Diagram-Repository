# Third-Party Content Notices

The DIDAS Trust Flow Diagrams are licensed under [CC BY 4.0](LICENSE-CONTENT)
(the diagrams and models) and [MIT](LICENSE) (the software components).

The diagrams depict protocols, data formats and infrastructure defined by
external specifications, and the generated LikeC4 site redistributes
third-party code and fonts. Those materials remain under the terms of their
original licenses, as listed below.

**These are not official flows of the swiyu team, the Swiss Confederation, or
any other authority.** They are independent, unendorsed interpretations,
published without warranty as work in progress for discussion purposes only.
Where a diagram and a specification disagree, the specification is
authoritative.

## Specifications the flows are derived from

Specification text is not reproduced in this repository — the diagrams model
the flows these documents describe, and name their protocols and formats.

| Source | License / terms | Used in |
|---|---|---|
| [swiyu-admin-ch specifications](https://swiyu-admin-ch.github.io/specifications/) ([swiyu-admin-ch](https://github.com/swiyu-admin-ch)) | Published by the Swiss Confederation; referenced with attribution | The trust-infrastructure shape of every flow — Base Registry, Trust Registry, wallet, issuer/verifier roles |
| [OpenID for Verifiable Credential Issuance (OID4VCI)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) | OpenID Foundation, under the [OpenID IPR policy](https://openid.net/intellectual-property/); referenced, not reproduced | Issuance steps in `basic-flow/credential-flow.likec4` and the banking/education issuance flows |
| [OpenID for Verifiable Presentations (OID4VP)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) | OpenID Foundation, under the [OpenID IPR policy](https://openid.net/intellectual-property/); referenced, not reproduced | Presentation/verification steps, incl. `response_mode=direct_post` |
| [SD-JWT](https://datatracker.ietf.org/doc/draft-ietf-oauth-selective-disclosure-jwt/) and [SD-JWT VC](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/) (IETF OAuth WG) | [IETF Trust Legal Provisions](https://trustee.ietf.org/documents/trust-legal-provisions/); referenced, not reproduced | Credential format and the selective-disclosure mechanism described in `basic-flow/README.md` |
| [OAuth 2.0 (RFC 6749)](https://www.rfc-editor.org/rfc/rfc6749) and [Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/) (IETF OAuth WG) | [IETF Trust Legal Provisions](https://trustee.ietf.org/documents/trust-legal-provisions/); referenced, not reproduced | Token endpoint and revocation-status steps |
| [W3C Verifiable Credentials Data Model](https://www.w3.org/TR/vc-data-model/) and [DID Core](https://www.w3.org/TR/did-core/) | [W3C Software and Document License](https://www.w3.org/copyright/software-license/); referenced, not reproduced | Trust Statement format and DID Document lookups |

## Code and fonts redistributed in this repository

| Source | License / terms | Used in |
|---|---|---|
| [LikeC4](https://likec4.dev) ([likec4/likec4](https://github.com/likec4/likec4)) | [MIT](https://github.com/likec4/likec4/blob/main/LICENSE) | Modelling language and generator; its build output — including bundled dependencies — is committed under `basic-flow/likec4-basic-flow/` |
| [IBM Plex Sans](https://github.com/IBM/plex) | [SIL Open Font License 1.1](https://github.com/IBM/plex/blob/master/LICENSE.txt) | Embedded as woff2 in `basic-flow/likec4-basic-flow/assets/fonts-*.css` (via the LikeC4 build) |

`basic-flow/likec4-basic-flow/` is generated output. The model content in it is
DIDAS's own and is covered by CC BY 4.0; the surrounding runtime and its
bundled npm dependencies are third-party code under their own (predominantly
MIT) licenses, retained through the LikeC4 build. Regenerating the site from
`basic-flow/credential-flow.likec4` reproduces it.

## Tooling and referenced assets, not redistributed

- **Miro** — the SVG diagrams under `banking/` and `education/` were authored by
  the contributors named in each folder's README and exported from Miro. The
  drawings are DIDAS content; Miro is only the tool. The exports reference
  webfonts (Noto Sans, Open Sans — [SIL OFL 1.1](https://openfontlicense.org/))
  hosted on `mirostatic.com` rather than embedding them, so opening an SVG
  fetches those files from Miro's servers.
- **DIDAS logo** — `index.html` links the logo from `www.didas.swiss`. The DIDAS
  name and logo are trademarks of the association and are **not** covered by the
  CC BY 4.0 grant; reuse of the diagrams does not imply endorsement.

## Why this license split

The diagrams are documents, not software: CC BY 4.0 keeps them freely reusable
with attribution, using the standard license family for open documentation.
The workflows and site scaffolding are ordinary software and use MIT, which also
matches LikeC4's own license — so the model, the generator, and the published
site carry no license friction.

LikeC4 model files sit on the line between the two. They are treated as
**content** (CC BY 4.0): although they are text files processed by a compiler,
the work being licensed is the flow they describe, not a program.
