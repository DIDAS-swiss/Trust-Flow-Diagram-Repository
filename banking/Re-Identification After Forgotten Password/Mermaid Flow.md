# Password Reset Flow

The passwort reset flow presented here is split into 4 phases:
1. Bank Credential: The user must supply something that identifies the user (e.g. an e-banking contract number or a loginname). This is required to fetch the user account information from the database. If the user is found, the flow proceeds to the next phase.
2. E-ID Verification: This phase asks the user to share some attributes from the E-ID (lastname, firstname, date of birth, portrait). It then compares the data from the E-ID with the data from the database. If the data matches, the flow proceeds to the next phase.
3. In this phase the portrait from the E-ID is used to run a liveness check. If the liveness check success the flow proceeds to the next phase.
4. In this pase the user can choose a new password.

## Phase 1: Get Bank Credential

```mermaid

%%{init: {
  "theme": "default",
  "themeVariables": {
    "fontSize": "20px",
    "actorFontSize": "20px",
    "noteFontSize": "18px",
    "fontFamily": "Inter, Arial"
  }
}}%%

sequenceDiagram
    participant User as "👤 User

    box rgb(220,235,255) User Channels
        participant EBankingApp as 📱 E-Banking App
        participant SWIYUApp as 🪪 SWIYU App
        participant EmbeddedBrowser as 🌐 Embedded Browser
    end

    box rgb(220,255,220) Bank
        participant EBankingBackend as 🏦 E-Banking Backend
        participant IAMSystem as 🔐 IAM System
        participant SSIVerifier as ✅ SSI Verifier
    end

    box rgb(255,235,210) External Services
        participant LivenessCheck as 📷 Liveness Check
        participant EIDTrust as 🛡️ E-ID Trust Infrastructure
    end

    Note over User,EIDTrust: Phase 1 — Get Bank Credential
    
    User->>+EBankingApp: Start Re-Ident
    activate EBankingApp
    EBankingApp->>User: Get Bank Credential from User
    User->>EBankingApp: Provide Bank Credential

    EBankingApp->>+EBankingBackend: Get bank credential from user
    EBankingBackend->>EBankingBackend: Get user data from DB
    EBankingBackend-->>-EBankingApp: Return user data to E-Banking App
    deactivate EBankingApp

```

## Phase 2: Verify E-ID

```mermaid

%%{init: {
  "theme": "default",
  "themeVariables": {
    "fontSize": "20px",
    "actorFontSize": "20px",
    "noteFontSize": "18px",
    "fontFamily": "Inter, Arial"
  }
}}%%

sequenceDiagram
    participant User as "👤 User

    box rgb(220,235,255) User Channels
        participant EBankingApp as 📱 E-Banking App
        participant SWIYUApp as 🪪 SWIYU App
        participant EmbeddedBrowser as 🌐 Embedded Browser
    end

    box rgb(220,255,220) Bank
        participant EBankingBackend as 🏦 E-Banking Backend
        participant IAMSystem as 🔐 IAM System
        participant SSIVerifier as ✅ SSI Verifier
    end

    box rgb(255,235,210) External Services
        participant LivenessCheck as 📷 Liveness Check
        participant EIDTrust as 🛡️ E-ID Trust Infrastructure
    end

    activate EBankingApp
    Note over User,EIDTrust: Phase 2 — Verify E-ID

    EBankingApp->>+IAMSystem: Start PW reset flow
    IAMSystem->>+SSIVerifier: Generate verification URL
    SSIVerifier-->>-IAMSystem: Return Verification URL

    IAMSystem-->>-EBankingApp: Redirect to SWIYU App
    deactivate EBankingApp

    par User shares E-ID
        activate SWIYUApp
        EBankingApp->>SWIYUApp: Start SWIYU App with Verification URL
        SWIYUApp->>SSIVerifier: Get verification request
        SSIVerifier-->>SWIYUApp: Return Verification request
        SWIYUApp->>User: User approval
        User->>SWIYUApp: Grant approval
        SWIYUApp->>+SSIVerifier: Provide E-ID Verifiable Presentation
        SSIVerifier-->>SWIYUApp: Confirm receipt of E-ID VP
        SWIYUApp-->>+EBankingApp: Return to E-Banking App
        activate EBankingApp
        deactivate SWIYUApp
        SSIVerifier->>+EIDTrust: Verify issuer (registration, revocation)
        EIDTrust-->>-SSIVerifier: Verification status response
    and IAM polls verification status
        loop Poll verification status
            IAMSystem->>SSIVerifier: Get E-ID verification status
            SSIVerifier-->>IAMSystem: E-ID status pending
        end
        SSIVerifier-->>IAMSystem: E-ID status verified
        activate IAMSystem
        IAMSystem->>IAMSystem: Compare E-ID data and Bank data
    end

    loop
        EBankingApp->>IAMSystem: Poll Flow status
        IAMSystem-->>EBankingApp: Flow status pending
    end
    IAMSystem-->>EBankingApp: Flow status ready for Liveness Check
   
    deactivate EBankingApp
    deactivate IAMSystem
```
## Phase 3: Liveness Check

```mermaid

%%{init: {
  "theme": "default",
  "themeVariables": {
    "fontSize": "20px",
    "actorFontSize": "20px",
    "noteFontSize": "18px",
    "fontFamily": "Inter, Arial"
  }
}}%%

sequenceDiagram
    participant User as "👤 User

    box rgb(220,235,255) User Channels
        participant EBankingApp as 📱 E-Banking App
        participant SWIYUApp as 🪪 SWIYU App
        participant EmbeddedBrowser as 🌐 Embedded Browser
    end

    box rgb(220,255,220) Bank
        participant EBankingBackend as 🏦 E-Banking Backend
        participant IAMSystem as 🔐 IAM System
        participant SSIVerifier as ✅ SSI Verifier
    end

    box rgb(255,235,210) External Services
        participant LivenessCheck as 📷 Liveness Check
        participant EIDTrust as 🛡️ E-ID Trust Infrastructure
    end

    activate EBankingApp
    activate IAMSystem
    Note over User,EIDTrust: Phase 3 — Liveness Check

    EBankingApp->>IAMSystem: start Liveness Check

    IAMSystem->>+LivenessCheck: Generate liveness session<br/>(using portrait from E-ID)
    LivenessCheck-->>IAMSystem: Return Liveness Check URL
    IAMSystem-->>EBankingApp: Redirect to liveness Check URL
    par User performs liveness check
        activate EmbeddedBrowser
        EBankingApp->>EmbeddedBrowser: Open liveness Check URL
        deactivate EBankingApp
        EmbeddedBrowser->>+LivenessCheck: Verify liveness using Video Feed
        LivenessCheck-->>-EmbeddedBrowser: Return to E-Banking App
        EmbeddedBrowser-->>+EBankingApp: Return to E-Banking App
        deactivate EmbeddedBrowser
    and IAM polls for completion
        loop Poll liveness status
            IAMSystem->>LivenessCheck: Get Liveness Check status
            LivenessCheck-->>IAMSystem: Liveness Check pending
        end
    end

    LivenessCheck-->>IAMSystem: Lifeness Check verified
    IAMSystem->>IAMSystem: Verify Liveness Check Result
    deactivate IAMSystem
    
```
## Phase 4: Set Password
```mermaid

%%{init: {
  "theme": "default",
  "themeVariables": {
    "fontSize": "20px",
    "actorFontSize": "20px",
    "noteFontSize": "18px",
    "fontFamily": "Inter, Arial"
  }
}}%%

sequenceDiagram
    participant User as "👤 User

    box rgb(220,235,255) User Channels
        participant EBankingApp as 📱 E-Banking App
        participant SWIYUApp as 🪪 SWIYU App
        participant EmbeddedBrowser as 🌐 Embedded Browser
    end

    box rgb(220,255,220) Bank
        participant EBankingBackend as 🏦 E-Banking Backend
        participant IAMSystem as 🔐 IAM System
        participant SSIVerifier as ✅ SSI Verifier
    end

    box rgb(255,235,210) External Services
        participant LivenessCheck as 📷 Liveness Check
        participant EIDTrust as 🛡️ E-ID Trust Infrastructure
    end

    activate IAMSystem
    activate EBankingApp
    Note over User,EIDTrust: Phase 4 — Set Password

    IAMSystem-->>EBankingApp: Get Password/PIN
    EBankingApp->>User: Get Password from User
    User->>EBankingApp: Provide Password
    EBankingApp->>IAMSystem: Set Password

    IAMSystem->>IAMSystem: Update credential
    IAMSystem-->>EBankingApp: Confirm to user
    deactivate IAMSystem

    EBankingApp-->>-User: End Re-Ident

