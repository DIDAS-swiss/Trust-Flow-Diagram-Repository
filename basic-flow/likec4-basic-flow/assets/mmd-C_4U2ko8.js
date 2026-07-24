var e=e=>{switch(e){case`index`:return`---
title: "Verifiable Credential Trust Infrastructure — Overview"
---
graph TB
  Holder@{ icon: "fa:user", shape: rounded, label: "Holder" }
  Issuer@{ shape: rectangle, label: "Issuer" }
  Verifier@{ shape: rectangle, label: "Verifier" }
  Confederation@{ shape: rectangle, label: "Federal Trust-Infrastructure" }
  Holder -. "\`requests & receives credential\`" .-> Issuer
  Holder -. "\`presents credential for a check\`" .-> Verifier
  Issuer -. "\`registers DID & gets accredited\`" .-> Confederation
  Verifier -. "\`resolves DIDs, checks status & accreditation\`" .-> Confederation
`;case`trustInfrastructureDetail`:return`---
title: "Trust Infrastructure — Base Registry & Trust Registry"
---
graph TB
  Holder@{ icon: "fa:user", shape: rounded, label: "Holder" }
  Issuer@{ shape: rectangle, label: "Issuer" }
  Verifier@{ shape: rectangle, label: "Verifier" }
  subgraph Confederation["\`Federal Trust-Infrastructure\`"]
    Confederation.BaseRegistry@{ shape: cylinder, label: "Base Registry" }
    Confederation.TrustRegistry@{ shape: cylinder, label: "Trust Registry" }
  end
  Issuer -. "\`publishes DID + public key, updates revocation status\`" .-> Confederation.BaseRegistry
  Issuer -. "\`applies for and holds issuer accreditation\`" .-> Confederation.TrustRegistry
  Holder -. "\`requests & receives credential\`" .-> Issuer
  Holder -. "\`presents credential for a check\`" .-> Verifier
  Verifier -. "\`publishes DID + public key, resolves issuer DID, checks status\`" .-> Confederation.BaseRegistry
  Verifier -. "\`applies for accreditation, checks issuer/verifier trust\`" .-> Confederation.TrustRegistry
`;case`registration`:return`---
title: "Registration & Trust Setup — Sequence"
---
graph LR
  Issuer@{ shape: rectangle, label: "Issuer" }
  Verifier@{ shape: rectangle, label: "Verifier" }
  subgraph Confederation["\`Federal Trust-Infrastructure\`"]
    Confederation.BaseRegistry@{ shape: cylinder, label: "Base Registry" }
    Confederation.TrustRegistry@{ shape: cylinder, label: "Trust Registry" }
  end
  Issuer -. "\`Publish issuer key\`" .-> Confederation.BaseRegistry
  Issuer -. "\`Apply for issuer accreditation\`" .-> Confederation.TrustRegistry
  Confederation.TrustRegistry -. "\`Trust Statement issued\`" .-> Issuer
  Verifier -. "\`Publish verifier key\`" .-> Confederation.BaseRegistry
  Verifier -. "\`Apply for verifier accreditation\`" .-> Confederation.TrustRegistry
  Confederation.TrustRegistry -. "\`Trust Statement issued\`" .-> Verifier
`;case`issuance`:return`---
title: "Credential Issuance — Sequence"
---
graph LR
  Holder@{ icon: "fa:user", shape: rounded, label: "Holder" }
  Issuer@{ shape: rectangle, label: "Issuer" }
  subgraph Confederation["\`Federal Trust-Infrastructure\`"]
    Confederation.TrustRegistry@{ shape: cylinder, label: "Trust Registry" }
    Confederation.BaseRegistry@{ shape: cylinder, label: "Base Registry" }
  end
  Holder -. "\`Verify identity\`" .-> Issuer
  Issuer -. "\`Send credential offer (QR / link)\`" .-> Holder
  Holder -. "\`Check the Issuer is accredited\`" .-> Confederation.TrustRegistry
  Holder -. "\`Request an access token\`" .-> Issuer
  Issuer -. "\`Return access token\`" .-> Holder
  Holder -. "\`Request the credential\`" .-> Issuer
  Issuer -. "\`Issue the credential\`" .-> Holder
  Issuer -. "\`Publish revocation status entry\`" .-> Confederation.BaseRegistry
`;case`verification`:return`---
title: "Credential Verification — 'Over 18?' example — Sequence"
---
graph LR
  Holder@{ icon: "fa:user", shape: rounded, label: "Holder" }
  Verifier@{ shape: rectangle, label: "Verifier" }
  subgraph Confederation["\`Federal Trust-Infrastructure\`"]
    Confederation.BaseRegistry@{ shape: cylinder, label: "Base Registry" }
    Confederation.TrustRegistry@{ shape: cylinder, label: "Trust Registry" }
  end
  Verifier -. "\`Request proof of age (over 18)\`" .-> Holder
  Holder -. "\`Check requester signature\`" .-> Confederation.BaseRegistry
  Holder -. "\`Check requester is accredited\`" .-> Confederation.TrustRegistry
  Holder -. "\`Send proof (only 'over 18')\`" .-> Verifier
  Verifier -. "\`Check issuer signature\`" .-> Confederation.BaseRegistry
  Verifier -. "\`Check credential is not revoked\`" .-> Confederation.BaseRegistry
  Verifier -. "\`Check issuer is still accredited\`" .-> Confederation.TrustRegistry
`;default:throw Error(`Unknown viewId: `+e)}};export{e as mmdSource};