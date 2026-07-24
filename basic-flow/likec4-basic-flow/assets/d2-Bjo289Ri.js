var e=e=>{switch(e){case`index`:return`direction: down

Holder: {
  label: "Holder"
  shape: c4-person
}
Issuer: {
  label: "Issuer"
}
Verifier: {
  label: "Verifier"
}
Confederation: {
  label: "Federal Trust-Infrastructure"
}

Holder -> Issuer: "requests & receives credential"
Holder -> Verifier: "presents credential for a check"
Issuer -> Confederation: "registers DID & gets accredited"
Verifier -> Confederation: "resolves DIDs, checks status & accreditation"
`;case`trustInfrastructureDetail`:return`direction: down

Holder: {
  label: "Holder"
  shape: c4-person
}
Issuer: {
  label: "Issuer"
}
Verifier: {
  label: "Verifier"
}
Confederation: {
  label: "Federal Trust-Infrastructure"

  BaseRegistry: {
    label: "Base Registry"
    shape: cylinder
  }
  TrustRegistry: {
    label: "Trust Registry"
    shape: cylinder
  }
}

Issuer -> Confederation.BaseRegistry: "publishes DID + public key, updates revocation status"
Issuer -> Confederation.TrustRegistry: "applies for and holds issuer accreditation"
Holder -> Issuer: "requests & receives credential"
Holder -> Verifier: "presents credential for a check"
Verifier -> Confederation.BaseRegistry: "publishes DID + public key, resolves issuer DID, checks status"
Verifier -> Confederation.TrustRegistry: "applies for accreditation, checks issuer/verifier trust"
`;case`registration`:return`direction: right

Issuer: {
  label: "Issuer"
}
Verifier: {
  label: "Verifier"
}
Confederation: {
  label: "Federal Trust-Infrastructure"

  BaseRegistry: {
    label: "Base Registry"
    shape: cylinder
  }
  TrustRegistry: {
    label: "Trust Registry"
    shape: cylinder
  }
}

Issuer -> Confederation.BaseRegistry: "Publish issuer key"
Issuer -> Confederation.TrustRegistry: "Apply for issuer accreditation"
Confederation.TrustRegistry -> Issuer: "Trust Statement issued"
Verifier -> Confederation.BaseRegistry: "Publish verifier key"
Verifier -> Confederation.TrustRegistry: "Apply for verifier accreditation"
Confederation.TrustRegistry -> Verifier: "Trust Statement issued"
`;case`issuance`:return`direction: right

Holder: {
  label: "Holder"
  shape: c4-person
}
Issuer: {
  label: "Issuer"
}
Confederation: {
  label: "Federal Trust-Infrastructure"

  TrustRegistry: {
    label: "Trust Registry"
    shape: cylinder
  }
  BaseRegistry: {
    label: "Base Registry"
    shape: cylinder
  }
}

Holder -> Issuer: "Verify identity"
Issuer -> Holder: "Send credential offer (QR / link)"
Holder -> Confederation.TrustRegistry: "Check the Issuer is accredited"
Holder -> Issuer: "Request an access token"
Issuer -> Holder: "Return access token"
Holder -> Issuer: "Request the credential"
Issuer -> Holder: "Issue the credential"
Issuer -> Confederation.BaseRegistry: "Publish revocation status entry"
`;case`verification`:return`direction: right

Holder: {
  label: "Holder"
  shape: c4-person
}
Verifier: {
  label: "Verifier"
}
Confederation: {
  label: "Federal Trust-Infrastructure"

  BaseRegistry: {
    label: "Base Registry"
    shape: cylinder
  }
  TrustRegistry: {
    label: "Trust Registry"
    shape: cylinder
  }
}

Verifier -> Holder: "Request proof of age (over 18)"
Holder -> Confederation.BaseRegistry: "Check requester signature"
Holder -> Confederation.TrustRegistry: "Check requester is accredited"
Holder -> Verifier: "Send proof (only \\"over 18\\")"
Verifier -> Confederation.BaseRegistry: "Check issuer signature"
Verifier -> Confederation.BaseRegistry: "Check credential is not revoked"
Verifier -> Confederation.TrustRegistry: "Check issuer is still accredited"
`;default:throw Error(`Unknown viewId: `+e)}};export{e as d2Source};