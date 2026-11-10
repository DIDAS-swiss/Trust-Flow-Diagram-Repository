# Education

Trust flows for the education domain: issuance of a Maturitätszeugnis (upper-secondary
school leaving certificate) and university onboarding using the e-ID and Maturitätszeugnis VC.

> Not an official flow of the swiyu team or any other authority — published without
> warranty. Work in progress, for discussion purposes only.

## Contributors

- Kevin Saner
- Matteo Demasi
- Davide Ravasi
- Axel Schild
- Julian Levkov
- Nora Sleumer

---

## High School Certificate Issuance

<img src="./High school Certificate Issuance.svg" width="100%">

[Open full size ↗](./High%20school%20Certificate%20Issuance.svg)

## Non-eID Matura Certificate Issuance (proposed)

A DIDAS proposal for discussion. The school issues the Matura certificate as a
credential without the e-ID: the student is identified with the school account.
A governing authority publishes the governance framework for the credential
(schema, issuance and revocation rules) and keeps the list of authoritative
issuers, which the wallet and the university check in the trust registry. The
flow ends with the university admission as the downstream use.

Basis: Matura certificates are recognised by the WBF and the EDK on cantonal
application to the SMK (MAV, SR 413.11, Art. 33-34). The issuer list and the
governance framework are a proposal; who runs them is not decided. Open: whether
a credential can carry the legal effect of the certificate, given the signature
requirement in MAV Art. 27. Use case:
[DIDAS-swiss/use-case-repository#121](https://github.com/DIDAS-swiss/use-case-repository/issues/121).

<img src="./Non-eID Matura Certificate Issuance.svg" width="100%">

[Open full size ↗](./Non-eID%20Matura%20Certificate%20Issuance.svg)

## University Immatriculation

<img src="./University immatriculation.svg" width="100%">

[Open full size ↗](./University%20immatriculation.svg)
