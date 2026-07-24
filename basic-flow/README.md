# Verifiable Credential Trust Infrastructure — LikeC4 Model

`credential-flow.likec4` models a generic verifiable-credential ecosystem: how a credential gets issued to a Holder's wallet, and how a Verifier later checks a single claim from it. The "is this person over 18?" check is used throughout as a concrete, easy-to-follow example, but nothing in the model is tied to a specific country, document, or standard body — the same shape works for a diploma, a professional license, a membership card, or any other verifiable credential.

## Actors

The model has four top-level participants:

- **Holder** — a person using a digital wallet app. Requests and stores credentials, and later presents them.
- **Issuer** — the organization that issues credentials, exposing an OID4VCI service.
- **Verifier** — a relying party that wants to check something about the Holder (e.g. an online shop checking age), exposing an OID4VP service.
- **Trust Infrastructure** — a container representing shared infrastructure that both the Issuer and Verifier rely on, but neither one runs themselves. It holds two databases:
  - **Base Registry** — purely technical: DIDs, public keys, DID Documents, and revocation status lists. No legal identity information lives here.
  - **Trust Registry** — links a technical DID to a real-world, accredited legal identity (e.g. "this DID belongs to this legally registered organization, and it's authorized to act as an issuer/verifier").

## Views

- **`index`** — a landscape overview of all four participants and how they relate.
- **`trustInfrastructureDetail`** — clicking the "Trust Infrastructure" box in any view drills down into this one automatically, expanding it into Base Registry + Trust Registry. (In LikeC4, defining a `view X of someElement` makes it that element's default navigation target — no extra wiring needed.)
- **`registration`** *(dynamic/sequence)* — the one-time setup where the Issuer and Verifier each publish a key to the Base Registry and get accredited in the Trust Registry. Everything else depends on this having happened first.
- **`issuance`** *(dynamic/sequence)* — the Holder gets a credential from the Issuer.
- **`verification`** *(dynamic/sequence)* — the Verifier checks one claim ("over 18") from a credential the Holder already holds.

Each step's title is a plain, readable action. The underlying protocol, data format, and a short explanation of *why* it works that way live in that step's notes — so the diagram reads cleanly at a glance, but all the technical detail is one click away.

## Why two registries instead of one?

A cryptographic signature can be perfectly valid while having nothing to do with a legitimate organization — anyone can generate a keypair and publish it. The Base Registry only ever answers "is this signature valid, and is this credential revoked?" The Trust Registry is what answers the separate question "does this key actually belong to who it claims, and are they authorized to issue or verify credentials?" Splitting the two also limits exposure: a breach of the high-traffic, anonymously-queried Base Registry leaks only keys, not who they belong to.

## Crypto cheat sheet — who signs what

| Artifact | Signed by | Proves |
|---|---|---|
| DID Document | the entity itself (Issuer/Verifier) | "this is my public key" |
| Trust Statement | the Trust Authority | "this DID really belongs to this accredited organization" |
| Credential (SD-JWT VC) | the Issuer | the claims and their hashes haven't been tampered with, and came from the Issuer |
| Token Status List | the Issuer (hosted by the Base Registry) | revocation state, without the Issuer being told who's checking |
| Key Binding JWT | the Holder's device key | the presenter is the one the credential was issued to, not a copy |
| Presentation Request | the Verifier | the request is genuinely from the named Verifier |

## Selective disclosure, in one paragraph

At issuance, each disclosable claim is replaced in the signed credential body by a salted hash digest, while the actual `(salt, name, value)` triple is handed to the wallet separately as a "Disclosure." At presentation time, the wallet simply chooses which Disclosures to send — for an age check, only the one for `age_over_18`. The verifier recomputes the hash of what it received and checks it matches a digest inside the signed body (proving that value really was issued), while having no way to learn anything about the claims whose Disclosures were withheld. No re-signing or contact with the Issuer is needed at presentation time.

## Rendering the diagrams

- **Playground:** paste the file into [playground.likec4.dev](https://playground.likec4.dev) and toggle the "Sequence" variant on the `registration`, `issuance`, or `verification` views.
- **CLI:** `likec4 export png --sequence -f "registration|issuance|verification" .`
- **VS Code:** install the LikeC4 extension, open the Preview panel, switch the variant from there.

By default, `dynamic view`s render as flow diagrams — the sequence/swimlane rendering with lifelines is a variant you switch to, not the default.
