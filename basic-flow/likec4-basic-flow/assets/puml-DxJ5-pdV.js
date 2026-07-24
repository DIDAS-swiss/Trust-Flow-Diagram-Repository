var e=e=>{switch(e){case`index`:return`@startuml
title "Verifiable Credential Trust Infrastructure — Overview"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Holder>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<Issuer>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<Verifier>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<Confederation>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
person "==Holder\\n\\nCitizen using the swiyu Wallet app" <<Holder>> as Holder
rectangle "==Issuer\\n\\nOrganization issuing verifiable credentials, via an OID4VCI service" <<Issuer>> as Issuer
rectangle "==Verifier\\n\\nRelying party (e.g. an online shop) — OID4VP service" <<Verifier>> as Verifier
rectangle "==Federal Trust-Infrastructure\\n\\nFederal trust infrastructure operated by FOITT" <<Confederation>> as Confederation

Holder .[#8D8D8D,thickness=2].> Issuer : <color:#8D8D8D>requests & receives credential
Holder .[#8D8D8D,thickness=2].> Verifier : <color:#8D8D8D>presents credential for a check
Issuer .[#8D8D8D,thickness=2].> Confederation : <color:#8D8D8D>registers DID & gets accredited
Verifier .[#8D8D8D,thickness=2].> Confederation : <color:#8D8D8D>resolves DIDs, checks status & accreditation
@enduml
`;case`trustInfrastructureDetail`:return`@startuml
title "Trust Infrastructure — Base Registry & Trust Registry"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Holder>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<Issuer>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<Verifier>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam database<<ConfederationBaseRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam database<<ConfederationTrustRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
person "==Holder\\n\\nCitizen using the swiyu Wallet app" <<Holder>> as Holder
rectangle "==Issuer\\n\\nOrganization issuing verifiable credentials, via an OID4VCI service" <<Issuer>> as Issuer
rectangle "==Verifier\\n\\nRelying party (e.g. an online shop) — OID4VP service" <<Verifier>> as Verifier
rectangle "Federal Trust-Infrastructure" <<Confederation>> as Confederation {
  skinparam RectangleBorderColor<<Confederation>> #6366f1
  skinparam RectangleFontColor<<Confederation>> #6366f1
  skinparam RectangleBorderStyle<<Confederation>> dashed

  database "==Base Registry\\n\\nDIDs, public keys, DID Documents, Token Status Lists" <<ConfederationBaseRegistry>> as ConfederationBaseRegistry
  database "==Trust Registry\\n\\nLinks DIDs to accredited legal identities (validated by a Trust Authority)" <<ConfederationTrustRegistry>> as ConfederationTrustRegistry
}

Issuer .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>publishes DID + public key, updates revocation status
Issuer .[#8D8D8D,thickness=2].> ConfederationTrustRegistry : <color:#8D8D8D>applies for and holds issuer accreditation
Holder .[#8D8D8D,thickness=2].> Issuer : <color:#8D8D8D>requests & receives credential
Holder .[#8D8D8D,thickness=2].> Verifier : <color:#8D8D8D>presents credential for a check
Verifier .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>publishes DID + public key, resolves issuer DID, checks status
Verifier .[#8D8D8D,thickness=2].> ConfederationTrustRegistry : <color:#8D8D8D>applies for accreditation, checks issuer/verifier trust
@enduml
`;case`registration`:return`@startuml
title "Registration & Trust Setup — Sequence"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<Issuer>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<Verifier>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam database<<ConfederationBaseRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam database<<ConfederationTrustRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
rectangle "==Issuer\\n\\nOrganization issuing verifiable credentials, via an OID4VCI service" <<Issuer>> as Issuer
rectangle "==Verifier\\n\\nRelying party (e.g. an online shop) — OID4VP service" <<Verifier>> as Verifier
rectangle "Federal Trust-Infrastructure" <<Confederation>> as Confederation {
  skinparam RectangleBorderColor<<Confederation>> #6366f1
  skinparam RectangleFontColor<<Confederation>> #6366f1
  skinparam RectangleBorderStyle<<Confederation>> dashed

  database "==Base Registry\\n\\nDIDs, public keys, DID Documents, Token Status Lists" <<ConfederationBaseRegistry>> as ConfederationBaseRegistry
  database "==Trust Registry\\n\\nLinks DIDs to accredited legal identities (validated by a Trust Authority)" <<ConfederationTrustRegistry>> as ConfederationTrustRegistry
}

Issuer .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>Publish issuer key
Issuer .[#8D8D8D,thickness=2].> ConfederationTrustRegistry : <color:#8D8D8D>Apply for issuer accreditation
ConfederationTrustRegistry .[#8D8D8D,thickness=2].> Issuer : <color:#8D8D8D>Trust Statement issued
Verifier .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>Publish verifier key
Verifier .[#8D8D8D,thickness=2].> ConfederationTrustRegistry : <color:#8D8D8D>Apply for verifier accreditation
ConfederationTrustRegistry .[#8D8D8D,thickness=2].> Verifier : <color:#8D8D8D>Trust Statement issued
@enduml
`;case`issuance`:return`@startuml
title "Credential Issuance — Sequence"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Holder>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<Issuer>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<ConfederationTrustRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam database<<ConfederationBaseRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
person "==Holder\\n\\nCitizen using the swiyu Wallet app" <<Holder>> as Holder
rectangle "==Issuer\\n\\nOrganization issuing verifiable credentials, via an OID4VCI service" <<Issuer>> as Issuer
rectangle "Federal Trust-Infrastructure" <<Confederation>> as Confederation {
  skinparam RectangleBorderColor<<Confederation>> #6366f1
  skinparam RectangleFontColor<<Confederation>> #6366f1
  skinparam RectangleBorderStyle<<Confederation>> dashed

  database "==Trust Registry\\n\\nLinks DIDs to accredited legal identities (validated by a Trust Authority)" <<ConfederationTrustRegistry>> as ConfederationTrustRegistry
  database "==Base Registry\\n\\nDIDs, public keys, DID Documents, Token Status Lists" <<ConfederationBaseRegistry>> as ConfederationBaseRegistry
}

Holder .[#8D8D8D,thickness=2].> Issuer : <color:#8D8D8D>Verify identity
Issuer .[#8D8D8D,thickness=2].> Holder : <color:#8D8D8D>Send credential offer (QR / link)
Holder .[#8D8D8D,thickness=2].> ConfederationTrustRegistry : <color:#8D8D8D>Check the Issuer is accredited
Holder .[#8D8D8D,thickness=2].> Issuer : <color:#8D8D8D>Request an access token
Issuer .[#8D8D8D,thickness=2].> Holder : <color:#8D8D8D>Return access token
Holder .[#8D8D8D,thickness=2].> Issuer : <color:#8D8D8D>Request the credential
Issuer .[#8D8D8D,thickness=2].> Holder : <color:#8D8D8D>Issue the credential
Issuer .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>Publish revocation status entry
@enduml
`;case`verification`:return`@startuml
title "Credential Verification — "Over 18?" example — Sequence"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Holder>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam rectangle<<Verifier>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam database<<ConfederationBaseRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
skinparam database<<ConfederationTrustRegistry>>{
  BackgroundColor #6366f1
  FontColor #eef2ff
  BorderColor #4f46e5
}
person "==Holder\\n\\nCitizen using the swiyu Wallet app" <<Holder>> as Holder
rectangle "==Verifier\\n\\nRelying party (e.g. an online shop) — OID4VP service" <<Verifier>> as Verifier
rectangle "Federal Trust-Infrastructure" <<Confederation>> as Confederation {
  skinparam RectangleBorderColor<<Confederation>> #6366f1
  skinparam RectangleFontColor<<Confederation>> #6366f1
  skinparam RectangleBorderStyle<<Confederation>> dashed

  database "==Base Registry\\n\\nDIDs, public keys, DID Documents, Token Status Lists" <<ConfederationBaseRegistry>> as ConfederationBaseRegistry
  database "==Trust Registry\\n\\nLinks DIDs to accredited legal identities (validated by a Trust Authority)" <<ConfederationTrustRegistry>> as ConfederationTrustRegistry
}

Verifier .[#8D8D8D,thickness=2].> Holder : <color:#8D8D8D>Request proof of age (over 18)
Holder .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>Check requester signature
Holder .[#8D8D8D,thickness=2].> ConfederationTrustRegistry : <color:#8D8D8D>Check requester is accredited
Holder .[#8D8D8D,thickness=2].> Verifier : <color:#8D8D8D>Send proof (only 'over 18')
Verifier .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>Check issuer signature
Verifier .[#8D8D8D,thickness=2].> ConfederationBaseRegistry : <color:#8D8D8D>Check credential is not revoked
Verifier .[#8D8D8D,thickness=2].> ConfederationTrustRegistry : <color:#8D8D8D>Check issuer is still accredited
@enduml
`;default:throw Error(`Unknown viewId: `+e)}};export{e as pumlSource};