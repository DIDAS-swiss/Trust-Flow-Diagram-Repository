var e=e=>{switch(e){case`index`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=index,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    holder [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Holder</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c2f0c2">Citizen using the swiyu Wallet app</FONT></TD></TR></TABLE>>,
        likec4_id=holder,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    issuer [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Issuer</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Organization issuing verifiable credentials,<BR/>via an OID4VCI service</FONT></TD></TR></TABLE>>,
        likec4_id=issuer,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    holder -> issuer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">requests &amp; receives credential</FONT></TD></TR></TABLE>>,
        likec4_id="1n6d9uh",
        style=dashed];
    verifier [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Verifier</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Relying party (e.g. an online shop) — OID4VP<BR/>service</FONT></TD></TR></TABLE>>,
        likec4_id=verifier,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    holder -> verifier [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">presents credential for a check</FONT></TD></TR></TABLE>>,
        likec4_id="14yioea",
        style=dashed];
    confederation [color="#4f46e5",
        fillcolor="#6366f1",
        fontcolor="#eef2ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Federal Trust-Infrastructure</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">Federal trust infrastructure<BR/>operated by FOITT</FONT></TD></TR></TABLE>>,
        likec4_id=confederation,
        likec4_level=0,
        margin="0.112,0.223",
        width=4.445];
    issuer -> confederation [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">registers DID &amp; gets accredited</FONT></TD></TR></TABLE>>,
        likec4_id="1lfzwem",
        style=dashed];
    verifier -> confederation [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">resolves DIDs, checks status &amp;<BR/>accreditation</FONT></TD></TR></TABLE>>,
        likec4_id=bvpfit,
        style=dashed];
}
`;case`trustInfrastructureDetail`:return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=trustInfrastructureDetail,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2,
        style=""
    ];
    subgraph cluster_confederation {
        graph [color="#2a2490",
            fillcolor="#2225aa",
            label=<<FONT POINT-SIZE="11" COLOR="#c7d2feb3"><B>FEDERAL TRUST-INFRASTRUCTURE</B></FONT>>,
            likec4_depth=1,
            likec4_id=confederation,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        baseregistry [color="#4f46e5",
            fillcolor="#6366f1",
            fontcolor="#eef2ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Base Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">DIDs, public keys, DID Documents,<BR/>Token Status Lists</FONT></TD></TR></TABLE>>,
            likec4_id="confederation.baseRegistry",
            likec4_level=1,
            margin="0.112,0",
            penwidth=2,
            shape=cylinder,
            width=4.445];
        trustregistry [color="#4f46e5",
            fillcolor="#6366f1",
            fontcolor="#eef2ff",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Trust Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">Links DIDs to accredited legal<BR/>identities (validated by a Trust<BR/>Authority)</FONT></TD></TR></TABLE>>,
            likec4_id="confederation.trustRegistry",
            likec4_level=1,
            margin="0.112,0",
            penwidth=2,
            shape=cylinder,
            width=4.445];
    }
    holder [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Holder</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c2f0c2">Citizen using the swiyu Wallet app</FONT></TD></TR></TABLE>>,
        likec4_id=holder,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    issuer [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Issuer</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Organization issuing verifiable credentials,<BR/>via an OID4VCI service</FONT></TD></TR></TABLE>>,
        likec4_id=issuer,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    holder -> issuer [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">requests &amp; receives credential</FONT></TD></TR></TABLE>>,
        likec4_id="1n6d9uh",
        style=dashed,
        weight=2];
    verifier [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Verifier</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Relying party (e.g. an online shop) — OID4VP<BR/>service</FONT></TD></TR></TABLE>>,
        likec4_id=verifier,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    holder -> verifier [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">presents credential for a check</FONT></TD></TR></TABLE>>,
        likec4_id="14yioea",
        style=dashed,
        weight=2];
    issuer -> baseregistry [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">publishes DID + public key, updates<BR/>revocation status</FONT></TD></TR></TABLE>>,
        likec4_id="1oda57k",
        style=dashed];
    issuer -> trustregistry [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">applies for and holds issuer<BR/>accreditation</FONT></TD></TR></TABLE>>,
        likec4_id=zpron5,
        style=dashed];
    verifier -> baseregistry [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">publishes DID + public key, resolves<BR/>issuer DID, checks status</FONT></TD></TR></TABLE>>,
        likec4_id=aqoli3,
        style=dashed];
    verifier -> trustregistry [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">applies for accreditation, checks<BR/>issuer/verifier trust</FONT></TD></TR></TABLE>>,
        likec4_id="114mn8a",
        style=dashed];
}
`;case`registration`:return`digraph {
  likec4_viewId = "registration";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.528;
  ranksep = 1.667;
  pad = 0.209;
  fontname = "Arial";
  ordering = "in";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "issuer" [
    likec4_id = "issuer";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Issuer</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Organization issuing verifiable credentials,<BR/>via an OID4VCI service</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
  ];
  "verifier" [
    likec4_id = "verifier";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Verifier</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Relying party (e.g. an online shop) — OID4VP<BR/>service</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "baseregistry" [
    likec4_id = "confederation.baseRegistry";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Base Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">DIDs, public keys, DID Documents,<BR/>Token Status Lists</FONT></TD></TR></TABLE>>;
    margin = "0.112,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
    penwidth = 2;
    shape = "cylinder";
  ];
  "trustregistry" [
    likec4_id = "confederation.trustRegistry";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Trust Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">Links DIDs to accredited legal<BR/>identities (validated by a Trust<BR/>Authority)</FONT></TD></TR></TABLE>>;
    margin = "0.112,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
    penwidth = 2;
    shape = "cylinder";
  ];
  subgraph "cluster_confederation" {
    likec4_id = "confederation";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#2225aa";
    color = "#2a2490";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#c7d2feb3"><B>FEDERAL TRUST-INFRASTRUCTURE</B></FONT>>;
    "baseregistry";
    "trustregistry";
  }
  "issuer" -> "baseregistry" [
    likec4_id = "step-01";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>1</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Publish issuer key</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "issuer" -> "trustregistry" [
    likec4_id = "step-02";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>2</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Apply for issuer accreditation</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "issuer" -> "trustregistry" [
    likec4_id = "step-03";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>3</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Trust Statement issued</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
  "verifier" -> "baseregistry" [
    likec4_id = "step-04";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>4</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Publish verifier key</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "verifier" -> "trustregistry" [
    likec4_id = "step-05";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>5</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Apply for verifier accreditation</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "verifier" -> "trustregistry" [
    likec4_id = "step-06";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>6</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Trust Statement issued</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
}`;case`issuance`:return`digraph {
  likec4_viewId = "issuance";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.528;
  ranksep = 1.667;
  pad = 0.209;
  fontname = "Arial";
  ordering = "in";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "holder" [
    likec4_id = "holder";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Holder</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c2f0c2">Citizen using the swiyu Wallet app</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#428a4f";
    fontcolor = "#f8fafc";
    color = "#2d5d39";
  ];
  "issuer" [
    likec4_id = "issuer";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Issuer</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Organization issuing verifiable credentials,<BR/>via an OID4VCI service</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#A35829";
    fontcolor = "#FFE0C2";
    color = "#7E451D";
  ];
  "trustregistry" [
    likec4_id = "confederation.trustRegistry";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Trust Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">Links DIDs to accredited legal<BR/>identities (validated by a Trust<BR/>Authority)</FONT></TD></TR></TABLE>>;
    margin = "0.112,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
    penwidth = 2;
    shape = "cylinder";
  ];
  "baseregistry" [
    likec4_id = "confederation.baseRegistry";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Base Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">DIDs, public keys, DID Documents,<BR/>Token Status Lists</FONT></TD></TR></TABLE>>;
    margin = "0.112,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
    penwidth = 2;
    shape = "cylinder";
  ];
  subgraph "cluster_confederation" {
    likec4_id = "confederation";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#2225aa";
    color = "#2a2490";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#c7d2feb3"><B>FEDERAL TRUST-INFRASTRUCTURE</B></FONT>>;
    "trustregistry";
    "baseregistry";
  }
  "holder" -> "issuer" [
    likec4_id = "step-01";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>1</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Verify identity</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "holder" -> "issuer" [
    likec4_id = "step-02";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>2</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Send credential offer (QR / link)</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
  "holder" -> "trustregistry" [
    likec4_id = "step-03";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>3</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Check the Issuer is accredited</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "holder" -> "issuer" [
    likec4_id = "step-04";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>4</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Request an access token</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "holder" -> "issuer" [
    likec4_id = "step-05";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>5</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Return access token</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
  "holder" -> "issuer" [
    likec4_id = "step-06";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>6</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Request the credential</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "holder" -> "issuer" [
    likec4_id = "step-07";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>7</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Issue the credential</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
  "issuer" -> "baseregistry" [
    likec4_id = "step-08";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>8</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Publish revocation status entry</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
}`;case`verification`:return`digraph {
  likec4_viewId = "verification";
  bgcolor = "transparent";
  layout = "dot";
  compound = true;
  rankdir = "LR";
  splines = "spline";
  outputorder = "nodesfirst";
  nodesep = 1.528;
  ranksep = 1.667;
  pad = 0.209;
  fontname = "Arial";
  ordering = "in";
  graph [
    fontsize = 20;
    labeljust = "l";
    labelloc = "t";
  ];
  edge [
    arrowsize = 0.75;
    fontname = "Arial";
    fontsize = 14;
    penwidth = 2;
    color = "#8D8D8D";
    fontcolor = "#C9C9C9";
    style = "dashed";
  ];
  node [
    fontname = "Arial";
    shape = "rect";
    fillcolor = "#3b82f6";
    fontcolor = "#eff6ff";
    color = "#2563eb";
    style = "filled";
    penwidth = 0;
  ];
  "holder" [
    likec4_id = "holder";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Holder</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c2f0c2">Citizen using the swiyu Wallet app</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#428a4f";
    fontcolor = "#f8fafc";
    color = "#2d5d39";
  ];
  "verifier" [
    likec4_id = "verifier";
    likec4_level = 0;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Verifier</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Relying party (e.g. an online shop) — OID4VP<BR/>service</FONT></TD></TR></TABLE>>;
    margin = "0.223,0.223";
    width = 4.445;
    height = 2.5;
    fillcolor = "#0284c7";
    fontcolor = "#f0f9ff";
    color = "#0369a1";
  ];
  "baseregistry" [
    likec4_id = "confederation.baseRegistry";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Base Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">DIDs, public keys, DID Documents,<BR/>Token Status Lists</FONT></TD></TR></TABLE>>;
    margin = "0.112,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
    penwidth = 2;
    shape = "cylinder";
  ];
  "trustregistry" [
    likec4_id = "confederation.trustRegistry";
    likec4_level = 1;
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD ROWSPAN="2" WIDTH="76"> </TD><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="20">Trust Registry</FONT></TD><TD ROWSPAN="2" WIDTH="16"> </TD></TR><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="15" COLOR="#c7d2fe">Links DIDs to accredited legal<BR/>identities (validated by a Trust<BR/>Authority)</FONT></TD></TR></TABLE>>;
    margin = "0.112,0";
    width = 4.445;
    height = 2.5;
    fillcolor = "#6366f1";
    fontcolor = "#eef2ff";
    color = "#4f46e5";
    penwidth = 2;
    shape = "cylinder";
  ];
  subgraph "cluster_confederation" {
    likec4_id = "confederation";
    likec4_level = 0;
    likec4_depth = 1;
    fillcolor = "#2225aa";
    color = "#2a2490";
    style = "filled";
    margin = 40;
    label = <<FONT POINT-SIZE="11" COLOR="#c7d2feb3"><B>FEDERAL TRUST-INFRASTRUCTURE</B></FONT>>;
    "baseregistry";
    "trustregistry";
  }
  "holder" -> "verifier" [
    likec4_id = "step-01";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>1</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Request proof of age (over 18)</FONT></TD></TR></TABLE>>;
    arrowtail = "normal";
    dir = "back";
  ];
  "holder" -> "baseregistry" [
    likec4_id = "step-02";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>2</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Check requester signature</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "holder" -> "trustregistry" [
    likec4_id = "step-03";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>3</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Check requester is accredited</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "holder" -> "verifier" [
    likec4_id = "step-04";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>4</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Send proof (only "over 18")</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "verifier" -> "baseregistry" [
    likec4_id = "step-05";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>5</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Check issuer signature</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "verifier" -> "baseregistry" [
    likec4_id = "step-06";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>6</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Check credential is not revoked</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
  "verifier" -> "trustregistry" [
    likec4_id = "step-07";
    label = <<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="3"><TR><TD><TABLE BORDER="0" CELLPADDING="6" BGCOLOR="#18191BA0"><TR><TD WIDTH="20" HEIGHT="20"><FONT POINT-SIZE="14"><B>7</B></FONT></TD></TR></TABLE></TD><TD BGCOLOR="#18191BA0" CELLPADDING="3"><FONT POINT-SIZE="14">Check issuer is still accredited</FONT></TD></TR></TABLE>>;
    arrowhead = "normal";
  ];
}`;default:throw Error(`Unknown viewId: `+e)}},t=e=>{switch(e){case`index`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.5 (0)
 -->
<!-- Pages: 1 -->
<svg width="806pt" height="872pt"
 viewBox="0.00 0.00 806.00 872.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 857.45)">
<!-- holder -->
<g id="node1" class="node">
<title>holder</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="541.57,-842.4 221.53,-842.4 221.53,-662.4 541.57,-662.4 541.57,-842.4"/>
<text xml:space="preserve" text-anchor="start" x="352.09" y="-755.4" font-family="Arial" font-size="20.00" fill="#f8fafc">Holder</text>
<text xml:space="preserve" text-anchor="start" x="267.74" y="-732.4" font-family="Arial" font-size="15.00" fill="#c2f0c2">Citizen using the swiyu Wallet app</text>
</g>
<!-- issuer -->
<g id="node2" class="node">
<title>issuer</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="321.09,-519.6 0,-519.6 0,-339.6 321.09,-339.6 321.09,-519.6"/>
<text xml:space="preserve" text-anchor="start" x="133.31" y="-441.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Issuer</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-418.6" font-family="Arial" font-size="15.00" fill="#f9b27c">Organization issuing verifiable credentials,</text>
<text xml:space="preserve" text-anchor="start" x="82.6" y="-400.6" font-family="Arial" font-size="15.00" fill="#f9b27c">via an OID4VCI service</text>
</g>
<!-- verifier -->
<g id="node3" class="node">
<title>verifier</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="775.76,-519.6 431.33,-519.6 431.33,-339.6 775.76,-339.6 775.76,-519.6"/>
<text xml:space="preserve" text-anchor="start" x="571.87" y="-441.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">Verifier</text>
<text xml:space="preserve" text-anchor="start" x="451.38" y="-418.6" font-family="Arial" font-size="15.00" fill="#b6ecf7">Relying party (e.g. an online shop) — OID4VP</text>
<text xml:space="preserve" text-anchor="start" x="579.79" y="-400.6" font-family="Arial" font-size="15.00" fill="#b6ecf7">service</text>
</g>
<!-- confederation -->
<g id="node4" class="node">
<title>confederation</title>
<polygon fill="#6366f1" stroke="#4f46e5" stroke-width="0" points="565.31,-180 197.78,-180 197.78,0 565.31,0 565.31,-180"/>
<text xml:space="preserve" text-anchor="start" x="245.9" y="-84.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="289.84" y="-102" font-family="Arial" font-size="20.00" fill="#eef2ff">Federal Trust&#45;Infrastructure</text>
<text xml:space="preserve" text-anchor="start" x="543.3" y="-84.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="289.84" y="-79" font-family="Arial" font-size="15.00" fill="#c7d2fe">Federal trust infrastructure</text>
<text xml:space="preserve" text-anchor="start" x="289.84" y="-61" font-family="Arial" font-size="15.00" fill="#c7d2fe">operated by FOITT</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge1" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M287.42,-662.58C270.1,-643.68 253.07,-623.14 239.01,-602.4 223.67,-579.78 210,-553.68 198.54,-528.76"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="200.99,-527.79 195.51,-522.03 196.2,-529.95 200.99,-527.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="239.01,-579.6 239.01,-602.4 432.55,-602.4 432.55,-579.6 239.01,-579.6"/>
<text xml:space="preserve" text-anchor="start" x="242.01" y="-585.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">requests &amp; receives credential</text>
</g>
<!-- holder&#45;&gt;verifier -->
<g id="edge2" class="edge">
<title>holder&#45;&gt;verifier</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M443.09,-662.47C472.02,-620.66 506.59,-570.71 536.22,-527.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="538.24,-529.58 540.35,-521.92 533.92,-526.59 538.24,-529.58"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="499.2,-579.6 499.2,-602.4 695.86,-602.4 695.86,-579.6 499.2,-579.6"/>
<text xml:space="preserve" text-anchor="start" x="502.2" y="-585.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">presents credential for a check</text>
</g>
<!-- issuer&#45;&gt;confederation -->
<g id="edge3" class="edge">
<title>issuer&#45;&gt;confederation</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M187.07,-340.06C199.01,-307.21 214.95,-270.54 234.8,-240 246.64,-221.79 260.96,-203.95 275.96,-187.3"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="277.71,-189.27 280.85,-181.97 273.84,-185.73 277.71,-189.27"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="234.8,-248.4 234.8,-271.2 434.55,-271.2 434.55,-248.4 234.8,-248.4"/>
<text xml:space="preserve" text-anchor="start" x="237.8" y="-254.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">registers DID &amp; gets accredited</text>
</g>
<!-- verifier&#45;&gt;confederation -->
<g id="edge4" class="edge">
<title>verifier&#45;&gt;confederation</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M545.22,-339.9C514.62,-293.36 477.06,-236.26 445.65,-188.49"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="448.04,-187.34 441.72,-182.52 443.65,-190.22 448.04,-187.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="499.2,-240 499.2,-279.6 698.15,-279.6 698.15,-240 499.2,-240"/>
<text xml:space="preserve" text-anchor="start" x="502.2" y="-262.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">resolves DIDs, checks status &amp;</text>
<text xml:space="preserve" text-anchor="start" x="502.2" y="-245.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">accreditation</text>
</g>
</g>
</svg>
`;case`trustInfrastructureDetail`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.5 (0)
 -->
<!-- Pages: 1 -->
<svg width="1143pt" height="930pt"
 viewBox="0.00 0.00 1143.00 930.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 914.65)">
<g id="clust1" class="cluster">
<title>cluster_confederation</title>
<polygon fill="#2225aa" stroke="#2a2490" points="79.94,-8 79.94,-289.2 951.94,-289.2 951.94,-8 79.94,-8"/>
<text xml:space="preserve" text-anchor="start" x="87.94" y="-276.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c7d2fe" fill-opacity="0.701961">FEDERAL TRUST&#45;INFRASTRUCTURE</text>
</g>
<!-- baseregistry -->
<g id="node1" class="node">
<title>baseregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M478.13,-211.64C478.13,-220.67 397.81,-228 298.94,-228 200.07,-228 119.76,-220.67 119.76,-211.64 119.76,-211.64 119.76,-64.36 119.76,-64.36 119.76,-55.33 200.07,-48 298.94,-48 397.81,-48 478.13,-55.33 478.13,-64.36 478.13,-64.36 478.13,-211.64 478.13,-211.64"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M478.13,-211.64C478.13,-202.61 397.81,-195.27 298.94,-195.27 200.07,-195.27 119.76,-202.61 119.76,-211.64"/>
<text xml:space="preserve" text-anchor="start" x="167.88" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="211.83" y="-150" font-family="Arial" font-size="20.00" fill="#eef2ff">Base Registry</text>
<text xml:space="preserve" text-anchor="start" x="456.12" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="211.83" y="-127" font-family="Arial" font-size="15.00" fill="#c7d2fe">DIDs, public keys, DID Documents,</text>
<text xml:space="preserve" text-anchor="start" x="211.83" y="-109" font-family="Arial" font-size="15.00" fill="#c7d2fe">Token Status Lists</text>
</g>
<!-- trustregistry -->
<g id="node2" class="node">
<title>trustregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M911.64,-211.64C911.64,-220.67 839.17,-228 749.94,-228 660.72,-228 588.25,-220.67 588.25,-211.64 588.25,-211.64 588.25,-64.36 588.25,-64.36 588.25,-55.33 660.72,-48 749.94,-48 839.17,-48 911.64,-55.33 911.64,-64.36 911.64,-64.36 911.64,-211.64 911.64,-211.64"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M911.64,-211.64C911.64,-202.61 839.17,-195.27 749.94,-195.27 660.72,-195.27 588.25,-202.61 588.25,-211.64"/>
<text xml:space="preserve" text-anchor="start" x="636.37" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="680.31" y="-159" font-family="Arial" font-size="20.00" fill="#eef2ff">Trust Registry</text>
<text xml:space="preserve" text-anchor="start" x="889.63" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="680.31" y="-136" font-family="Arial" font-size="15.00" fill="#c7d2fe">Links DIDs to accredited legal</text>
<text xml:space="preserve" text-anchor="start" x="680.31" y="-118" font-family="Arial" font-size="15.00" fill="#c7d2fe">identities (validated by a Trust</text>
<text xml:space="preserve" text-anchor="start" x="680.31" y="-100" font-family="Arial" font-size="15.00" fill="#c7d2fe">Authority)</text>
</g>
<!-- holder -->
<g id="node3" class="node">
<title>holder</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="682.96,-899.6 362.92,-899.6 362.92,-719.6 682.96,-719.6 682.96,-899.6"/>
<text xml:space="preserve" text-anchor="start" x="493.49" y="-812.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Holder</text>
<text xml:space="preserve" text-anchor="start" x="409.14" y="-789.6" font-family="Arial" font-size="15.00" fill="#c2f0c2">Citizen using the swiyu Wallet app</text>
</g>
<!-- issuer -->
<g id="node4" class="node">
<title>issuer</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="462.49,-576.8 141.4,-576.8 141.4,-396.8 462.49,-396.8 462.49,-576.8"/>
<text xml:space="preserve" text-anchor="start" x="274.71" y="-498.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Issuer</text>
<text xml:space="preserve" text-anchor="start" x="161.45" y="-475.8" font-family="Arial" font-size="15.00" fill="#f9b27c">Organization issuing verifiable credentials,</text>
<text xml:space="preserve" text-anchor="start" x="224" y="-457.8" font-family="Arial" font-size="15.00" fill="#f9b27c">via an OID4VCI service</text>
</g>
<!-- verifier -->
<g id="node5" class="node">
<title>verifier</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="917.16,-576.8 572.73,-576.8 572.73,-396.8 917.16,-396.8 917.16,-576.8"/>
<text xml:space="preserve" text-anchor="start" x="713.27" y="-498.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Verifier</text>
<text xml:space="preserve" text-anchor="start" x="592.78" y="-475.8" font-family="Arial" font-size="15.00" fill="#b6ecf7">Relying party (e.g. an online shop) — OID4VP</text>
<text xml:space="preserve" text-anchor="start" x="721.19" y="-457.8" font-family="Arial" font-size="15.00" fill="#b6ecf7">service</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge1" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M428.82,-719.78C411.5,-700.88 394.47,-680.34 380.41,-659.6 365.07,-636.98 351.4,-610.88 339.94,-585.96"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="342.38,-584.99 336.91,-579.23 337.6,-587.15 342.38,-584.99"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="380.41,-636.8 380.41,-659.6 573.94,-659.6 573.94,-636.8 380.41,-636.8"/>
<text xml:space="preserve" text-anchor="start" x="383.41" y="-642.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">requests &amp; receives credential</text>
</g>
<!-- holder&#45;&gt;verifier -->
<g id="edge2" class="edge">
<title>holder&#45;&gt;verifier</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M584.49,-719.67C613.42,-677.86 647.99,-627.91 677.62,-585.09"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="679.64,-586.78 681.75,-579.12 675.32,-583.79 679.64,-586.78"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="640.6,-636.8 640.6,-659.6 837.26,-659.6 837.26,-636.8 640.6,-636.8"/>
<text xml:space="preserve" text-anchor="start" x="643.6" y="-642.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">presents credential for a check</text>
</g>
<!-- issuer&#45;&gt;baseregistry -->
<g id="edge3" class="edge">
<title>issuer&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M141.48,-440.38C91.16,-417.74 41.18,-384.63 11.98,-336.8 -25.73,-275.01 34.47,-227.78 109.31,-194.99"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="110.33,-197.4 116.2,-192.05 108.27,-192.58 110.33,-197.4"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="11.98,-297.2 11.98,-336.8 240.94,-336.8 240.94,-297.2 11.98,-297.2"/>
<text xml:space="preserve" text-anchor="start" x="14.98" y="-319.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">publishes DID + public key, updates</text>
<text xml:space="preserve" text-anchor="start" x="14.98" y="-303" font-family="Arial" font-size="14.00" fill="#c9c9c9">revocation status</text>
</g>
<!-- issuer&#45;&gt;trustregistry -->
<g id="edge4" class="edge">
<title>issuer&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M303.27,-397C308.71,-360.44 321.87,-321.12 351.51,-297.2 367.21,-284.53 513.82,-295.64 532.94,-289.2 570.02,-276.72 606.49,-255.86 638.65,-233.6"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="640.07,-235.81 644.69,-229.34 637.05,-231.51 640.07,-235.81"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="351.51,-297.2 351.51,-336.8 527.94,-336.8 527.94,-297.2 351.51,-297.2"/>
<text xml:space="preserve" text-anchor="start" x="354.51" y="-319.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">applies for and holds issuer</text>
<text xml:space="preserve" text-anchor="start" x="354.51" y="-303" font-family="Arial" font-size="14.00" fill="#c9c9c9">accreditation</text>
</g>
<!-- verifier&#45;&gt;baseregistry -->
<g id="edge5" class="edge">
<title>verifier&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M670.81,-397.02C638.15,-362.2 597.53,-324.21 554.94,-297.2 546.16,-291.63 542.27,-293.82 532.94,-289.2 499.39,-272.59 464.68,-252.25 432.61,-231.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="434.36,-229.98 426.63,-228.17 431.54,-234.41 434.36,-229.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="607.68,-297.2 607.68,-336.8 838.95,-336.8 838.95,-297.2 607.68,-297.2"/>
<text xml:space="preserve" text-anchor="start" x="610.68" y="-319.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">publishes DID + public key, resolves</text>
<text xml:space="preserve" text-anchor="start" x="610.68" y="-303" font-family="Arial" font-size="14.00" fill="#c9c9c9">issuer DID, checks status</text>
</g>
<!-- verifier&#45;&gt;trustregistry -->
<g id="edge6" class="edge">
<title>verifier&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M861.05,-396.85C877.28,-378.85 891.59,-358.67 900.94,-336.8 916.61,-300.18 901.41,-264.29 875.54,-233.34"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="877.66,-231.77 870.74,-227.86 873.71,-235.23 877.66,-231.77"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="907.29,-297.2 907.29,-336.8 1112.5,-336.8 1112.5,-297.2 907.29,-297.2"/>
<text xml:space="preserve" text-anchor="start" x="910.29" y="-319.8" font-family="Arial" font-size="14.00" fill="#c9c9c9">applies for accreditation, checks</text>
<text xml:space="preserve" text-anchor="start" x="910.29" y="-303" font-family="Arial" font-size="14.00" fill="#c9c9c9">issuer/verifier trust</text>
</g>
</g>
</svg>
`;case`registration`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.5 (0)
 -->
<!-- Pages: 1 -->
<svg width="1124pt" height="789pt"
 viewBox="0.00 0.00 1124.00 789.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 773.52)">
<g id="clust1" class="cluster">
<title>cluster_confederation</title>
<polygon fill="#2225aa" stroke="#2a2490" points="647.85,-159.01 647.85,-730.01 1086.21,-730.01 1086.21,-159.01 647.85,-159.01"/>
<text xml:space="preserve" text-anchor="start" x="655.85" y="-717.11" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c7d2fe" fill-opacity="0.701961">FEDERAL TRUST&#45;INFRASTRUCTURE</text>
</g>
<!-- issuer -->
<g id="node1" class="node">
<title>issuer</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="332.76,-755.01 11.67,-755.01 11.67,-575.01 332.76,-575.01 332.76,-755.01"/>
<text xml:space="preserve" text-anchor="start" x="144.99" y="-677.01" font-family="Arial" font-size="20.00" fill="#ffe0c2">Issuer</text>
<text xml:space="preserve" text-anchor="start" x="31.73" y="-654.01" font-family="Arial" font-size="15.00" fill="#f9b27c">Organization issuing verifiable credentials,</text>
<text xml:space="preserve" text-anchor="start" x="94.27" y="-636.01" font-family="Arial" font-size="15.00" fill="#f9b27c">via an OID4VCI service</text>
</g>
<!-- verifier -->
<g id="node2" class="node">
<title>verifier</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="344.43,-293.01 0,-293.01 0,-113.01 344.43,-113.01 344.43,-293.01"/>
<text xml:space="preserve" text-anchor="start" x="140.54" y="-215.01" font-family="Arial" font-size="20.00" fill="#f0f9ff">Verifier</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-192.01" font-family="Arial" font-size="15.00" fill="#b6ecf7">Relying party (e.g. an online shop) — OID4VP</text>
<text xml:space="preserve" text-anchor="start" x="148.46" y="-174.01" font-family="Arial" font-size="15.00" fill="#b6ecf7">service</text>
</g>
<!-- baseregistry -->
<g id="node3" class="node">
<title>baseregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M1046.21,-652.65C1046.21,-661.68 965.9,-669.01 867.03,-669.01 768.16,-669.01 687.85,-661.68 687.85,-652.65 687.85,-652.65 687.85,-505.38 687.85,-505.38 687.85,-496.35 768.16,-489.01 867.03,-489.01 965.9,-489.01 1046.21,-496.35 1046.21,-505.38 1046.21,-505.38 1046.21,-652.65 1046.21,-652.65"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M1046.21,-652.65C1046.21,-643.62 965.9,-636.28 867.03,-636.28 768.16,-636.28 687.85,-643.62 687.85,-652.65"/>
<text xml:space="preserve" text-anchor="start" x="735.97" y="-573.41" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="779.91" y="-591.01" font-family="Arial" font-size="20.00" fill="#eef2ff">Base Registry</text>
<text xml:space="preserve" text-anchor="start" x="1024.2" y="-573.41" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="779.91" y="-568.01" font-family="Arial" font-size="15.00" fill="#c7d2fe">DIDs, public keys, DID Documents,</text>
<text xml:space="preserve" text-anchor="start" x="779.91" y="-550.01" font-family="Arial" font-size="15.00" fill="#c7d2fe">Token Status Lists</text>
</g>
<!-- trustregistry -->
<g id="node4" class="node">
<title>trustregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M1028.72,-362.65C1028.72,-371.68 956.25,-379.01 867.03,-379.01 777.81,-379.01 705.33,-371.68 705.33,-362.65 705.33,-362.65 705.33,-215.38 705.33,-215.38 705.33,-206.35 777.81,-199.01 867.03,-199.01 956.25,-199.01 1028.72,-206.35 1028.72,-215.38 1028.72,-215.38 1028.72,-362.65 1028.72,-362.65"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M1028.72,-362.65C1028.72,-353.62 956.25,-346.28 867.03,-346.28 777.81,-346.28 705.33,-353.62 705.33,-362.65"/>
<text xml:space="preserve" text-anchor="start" x="753.45" y="-283.41" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="797.4" y="-310.01" font-family="Arial" font-size="20.00" fill="#eef2ff">Trust Registry</text>
<text xml:space="preserve" text-anchor="start" x="1006.71" y="-283.41" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="797.4" y="-287.01" font-family="Arial" font-size="15.00" fill="#c7d2fe">Links DIDs to accredited legal</text>
<text xml:space="preserve" text-anchor="start" x="797.4" y="-269.01" font-family="Arial" font-size="15.00" fill="#c7d2fe">identities (validated by a Trust</text>
<text xml:space="preserve" text-anchor="start" x="797.4" y="-251.01" font-family="Arial" font-size="15.00" fill="#c7d2fe">Authority)</text>
</g>
<!-- issuer&#45;&gt;baseregistry -->
<g id="edge1" class="edge">
<title>issuer&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M332.74,-704.41C420.85,-719.88 531.62,-728.9 627.85,-705.01 658.57,-697.39 689.7,-684.99 718.87,-670.87"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="719.99,-673.24 725.55,-667.57 717.66,-668.54 719.99,-673.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="443.23,-722.68 443.23,-755.48 467.23,-755.48 467.23,-722.68 443.23,-722.68"/>
<text xml:space="preserve" text-anchor="start" x="451.33" y="-735.88" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">1</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="470.23,-722.68 470.23,-755.48 589.05,-755.48 589.05,-722.68 470.23,-722.68"/>
<text xml:space="preserve" text-anchor="start" x="473.23" y="-733.48" font-family="Arial" font-size="14.00" fill="#c9c9c9">Publish issuer key</text>
</g>
<!-- issuer&#45;&gt;trustregistry -->
<g id="edge2" class="edge">
<title>issuer&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M332.6,-643.76C446.98,-625.17 587.72,-594.33 627.85,-551.01 663.7,-512.31 619.08,-478.23 647.85,-434.01 661.2,-413.49 678.58,-395.19 697.71,-379.08"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="699.22,-381.23 703.37,-374.46 695.9,-377.17 699.22,-381.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="409.76,-632.43 409.76,-665.23 433.76,-665.23 433.76,-632.43 409.76,-632.43"/>
<text xml:space="preserve" text-anchor="start" x="417.87" y="-645.63" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">2</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="436.76,-632.43 436.76,-665.23 622.52,-665.23 622.52,-632.43 436.76,-632.43"/>
<text xml:space="preserve" text-anchor="start" x="439.76" y="-643.23" font-family="Arial" font-size="14.00" fill="#c9c9c9">Apply for issuer accreditation</text>
</g>
<!-- issuer&#45;&gt;trustregistry -->
<g id="edge3" class="edge">
<title>issuer&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M214.46,-565.96C252.01,-489.2 315.27,-387.4 404.43,-335.21 494.18,-282.68 610.83,-271.39 704.41,-273.1"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="212.21,-564.57 211.32,-572.47 216.94,-566.85 212.21,-564.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="427.66,-338.21 427.66,-371.01 451.66,-371.01 451.66,-338.21 427.66,-338.21"/>
<text xml:space="preserve" text-anchor="start" x="435.77" y="-351.41" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">3</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="454.66,-338.21 454.66,-371.01 604.62,-371.01 604.62,-338.21 454.66,-338.21"/>
<text xml:space="preserve" text-anchor="start" x="457.66" y="-349.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">Trust Statement issued</text>
</g>
<!-- verifier&#45;&gt;baseregistry -->
<g id="edge4" class="edge">
<title>verifier&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M266.1,-292.8C306.37,-328.48 355.46,-367.87 404.43,-397.01 405.26,-397.51 550.27,-454.66 677.52,-504.78"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="676.28,-507.11 684.22,-507.42 678.2,-502.23 676.28,-507.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="440.9,-485.9 440.9,-518.7 464.9,-518.7 464.9,-485.9 440.9,-485.9"/>
<text xml:space="preserve" text-anchor="start" x="449" y="-499.1" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">4</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="467.9,-485.9 467.9,-518.7 591.38,-518.7 591.38,-485.9 467.9,-485.9"/>
<text xml:space="preserve" text-anchor="start" x="470.9" y="-496.7" font-family="Arial" font-size="14.00" fill="#c9c9c9">Publish verifier key</text>
</g>
<!-- verifier&#45;&gt;trustregistry -->
<g id="edge5" class="edge">
<title>verifier&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M262.85,-113.05C302.7,-79.24 352.35,-44.77 404.43,-27.21 498.53,4.5 537.03,12.94 627.85,-27.21 703.12,-60.5 764.84,-130.62 806.57,-189.93"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="804.16,-191.07 810.6,-195.73 808.48,-188.07 804.16,-191.07"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="407.43,-30.21 407.43,-63.01 431.43,-63.01 431.43,-30.21 407.43,-30.21"/>
<text xml:space="preserve" text-anchor="start" x="415.54" y="-43.41" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">5</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="434.43,-30.21 434.43,-63.01 624.85,-63.01 624.85,-30.21 434.43,-30.21"/>
<text xml:space="preserve" text-anchor="start" x="437.43" y="-41.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">Apply for verifier accreditation</text>
</g>
<!-- verifier&#45;&gt;trustregistry -->
<g id="edge6" class="edge">
<title>verifier&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M354.83,-172.95C438.75,-164.49 539.24,-162.09 627.85,-181.21 653.69,-186.79 680.11,-195.41 705.49,-205.4"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="354.61,-170.33 347.42,-173.73 355.16,-175.56 354.61,-170.33"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="427.66,-184.21 427.66,-217.01 451.66,-217.01 451.66,-184.21 427.66,-184.21"/>
<text xml:space="preserve" text-anchor="start" x="435.77" y="-197.41" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">6</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="454.66,-184.21 454.66,-217.01 604.62,-217.01 604.62,-184.21 454.66,-184.21"/>
<text xml:space="preserve" text-anchor="start" x="457.66" y="-195.01" font-family="Arial" font-size="14.00" fill="#c9c9c9">Trust Statement issued</text>
</g>
</g>
</svg>
`;case`issuance`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.5 (0)
 -->
<!-- Pages: 1 -->
<svg width="1782pt" height="1025pt"
 viewBox="0.00 0.00 1782.00 1025.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1009.71)">
<g id="clust1" class="cluster">
<title>cluster_confederation</title>
<polygon fill="#2225aa" stroke="#2a2490" points="1305.87,-8 1305.87,-579 1744.23,-579 1744.23,-8 1305.87,-8"/>
<text xml:space="preserve" text-anchor="start" x="1313.87" y="-566.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c7d2fe" fill-opacity="0.701961">FEDERAL TRUST&#45;INFRASTRUCTURE</text>
</g>
<!-- holder -->
<g id="node1" class="node">
<title>holder</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="320.04,-660 0,-660 0,-480 320.04,-480 320.04,-660"/>
<text xml:space="preserve" text-anchor="start" x="130.56" y="-573" font-family="Arial" font-size="20.00" fill="#f8fafc">Holder</text>
<text xml:space="preserve" text-anchor="start" x="46.22" y="-550" font-family="Arial" font-size="15.00" fill="#c2f0c2">Citizen using the swiyu Wallet app</text>
</g>
<!-- issuer -->
<g id="node2" class="node">
<title>issuer</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="996.21,-660 675.12,-660 675.12,-480 996.21,-480 996.21,-660"/>
<text xml:space="preserve" text-anchor="start" x="808.44" y="-582" font-family="Arial" font-size="20.00" fill="#ffe0c2">Issuer</text>
<text xml:space="preserve" text-anchor="start" x="695.18" y="-559" font-family="Arial" font-size="15.00" fill="#f9b27c">Organization issuing verifiable credentials,</text>
<text xml:space="preserve" text-anchor="start" x="757.72" y="-541" font-family="Arial" font-size="15.00" fill="#f9b27c">via an OID4VCI service</text>
</g>
<!-- trustregistry -->
<g id="node3" class="node">
<title>trustregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M1686.74,-211.64C1686.74,-220.67 1614.27,-228 1525.05,-228 1435.83,-228 1363.35,-220.67 1363.35,-211.64 1363.35,-211.64 1363.35,-64.36 1363.35,-64.36 1363.35,-55.33 1435.83,-48 1525.05,-48 1614.27,-48 1686.74,-55.33 1686.74,-64.36 1686.74,-64.36 1686.74,-211.64 1686.74,-211.64"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M1686.74,-211.64C1686.74,-202.61 1614.27,-195.27 1525.05,-195.27 1435.83,-195.27 1363.35,-202.61 1363.35,-211.64"/>
<text xml:space="preserve" text-anchor="start" x="1411.47" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1455.42" y="-159" font-family="Arial" font-size="20.00" fill="#eef2ff">Trust Registry</text>
<text xml:space="preserve" text-anchor="start" x="1664.74" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1455.42" y="-136" font-family="Arial" font-size="15.00" fill="#c7d2fe">Links DIDs to accredited legal</text>
<text xml:space="preserve" text-anchor="start" x="1455.42" y="-118" font-family="Arial" font-size="15.00" fill="#c7d2fe">identities (validated by a Trust</text>
<text xml:space="preserve" text-anchor="start" x="1455.42" y="-100" font-family="Arial" font-size="15.00" fill="#c7d2fe">Authority)</text>
</g>
<!-- baseregistry -->
<g id="node4" class="node">
<title>baseregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M1704.23,-501.64C1704.23,-510.67 1623.92,-518 1525.05,-518 1426.18,-518 1345.87,-510.67 1345.87,-501.64 1345.87,-501.64 1345.87,-354.36 1345.87,-354.36 1345.87,-345.33 1426.18,-338 1525.05,-338 1623.92,-338 1704.23,-345.33 1704.23,-354.36 1704.23,-354.36 1704.23,-501.64 1704.23,-501.64"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M1704.23,-501.64C1704.23,-492.61 1623.92,-485.27 1525.05,-485.27 1426.18,-485.27 1345.87,-492.61 1345.87,-501.64"/>
<text xml:space="preserve" text-anchor="start" x="1393.99" y="-422.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1437.93" y="-440" font-family="Arial" font-size="20.00" fill="#eef2ff">Base Registry</text>
<text xml:space="preserve" text-anchor="start" x="1682.22" y="-422.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1437.93" y="-417" font-family="Arial" font-size="15.00" fill="#c7d2fe">DIDs, public keys, DID Documents,</text>
<text xml:space="preserve" text-anchor="start" x="1437.93" y="-399" font-family="Arial" font-size="15.00" fill="#c7d2fe">Token Status Lists</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge1" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M189.33,-659.98C221.02,-743.7 281.3,-863.48 380.04,-918 471.5,-968.51 523.63,-968.46 615.12,-918 710.19,-865.57 769.76,-752.74 802.47,-669.7"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="804.88,-670.75 805.14,-662.81 799.98,-668.86 804.88,-670.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="439.06,-958.86 439.06,-991.66 463.06,-991.66 463.06,-958.86 439.06,-958.86"/>
<text xml:space="preserve" text-anchor="start" x="447.17" y="-972.06" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">1</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="466.06,-958.86 466.06,-991.66 556.1,-991.66 556.1,-958.86 466.06,-958.86"/>
<text xml:space="preserve" text-anchor="start" x="469.06" y="-969.66" font-family="Arial" font-size="14.00" fill="#c9c9c9">Verify identity</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge2" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M241.39,-666.88C279.07,-704.82 327.28,-743.99 380.04,-764 477.73,-801.05 517.41,-800.99 615.12,-764 671.26,-742.75 722.29,-699.87 760.99,-659.82"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="243.72,-665.51 236.6,-661.98 239.96,-669.18 243.72,-665.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="383.04,-794.76 383.04,-827.56 407.04,-827.56 407.04,-794.76 383.04,-794.76"/>
<text xml:space="preserve" text-anchor="start" x="391.15" y="-807.96" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">2</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.04,-794.76 410.04,-827.56 612.12,-827.56 612.12,-794.76 410.04,-794.76"/>
<text xml:space="preserve" text-anchor="start" x="413.04" y="-805.56" font-family="Arial" font-size="14.00" fill="#c9c9c9">Send credential offer (QR / link)</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge4" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M319.96,-602.5C340.11,-605.59 360.5,-608.23 380.04,-610 484.1,-619.42 511.07,-619.4 615.12,-610 631.49,-608.52 648.46,-606.43 665.39,-603.98"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="665.32,-606.64 672.35,-602.94 664.55,-601.45 665.32,-606.64"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="402.48,-620.06 402.48,-652.86 426.48,-652.86 426.48,-620.06 402.48,-620.06"/>
<text xml:space="preserve" text-anchor="start" x="410.58" y="-633.26" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">4</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="429.48,-620.06 429.48,-652.86 592.68,-652.86 592.68,-620.06 429.48,-620.06"/>
<text xml:space="preserve" text-anchor="start" x="432.48" y="-630.86" font-family="Arial" font-size="14.00" fill="#c9c9c9">Request an access token</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge5" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M330.36,-548.06C347.12,-546.48 363.9,-545.15 380.04,-544.2 484.34,-538.08 510.82,-538.09 615.12,-544.2 634.66,-545.34 655.13,-547.06 675.38,-549.06"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="330.15,-545.44 322.94,-548.77 330.66,-550.66 330.15,-545.44"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="417.27,-547.2 417.27,-580 441.27,-580 441.27,-547.2 417.27,-547.2"/>
<text xml:space="preserve" text-anchor="start" x="425.38" y="-560.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">5</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="444.27,-547.2 444.27,-580 577.89,-580 577.89,-547.2 444.27,-547.2"/>
<text xml:space="preserve" text-anchor="start" x="447.27" y="-558" font-family="Arial" font-size="14.00" fill="#c9c9c9">Return access token</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge6" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M320,-491.55C339.82,-484.44 360.13,-478.36 380.04,-474.2 482.31,-452.81 512.84,-452.86 615.12,-474.2 631.8,-477.68 648.76,-482.5 665.48,-488.14"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="664.49,-490.57 672.44,-490.56 666.22,-485.62 664.49,-490.57"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="411.04,-477.2 411.04,-510 435.04,-510 435.04,-477.2 411.04,-477.2"/>
<text xml:space="preserve" text-anchor="start" x="419.14" y="-490.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">6</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="438.04,-477.2 438.04,-510 584.13,-510 584.13,-477.2 438.04,-477.2"/>
<text xml:space="preserve" text-anchor="start" x="441.04" y="-488" font-family="Arial" font-size="14.00" fill="#c9c9c9">Request the credential</text>
</g>
<!-- holder&#45;&gt;issuer -->
<g id="edge7" class="edge">
<title>holder&#45;&gt;issuer</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M251.58,-473.17C288.02,-440.96 332.64,-409.02 380.04,-392.2 478.51,-357.26 516.63,-357.32 615.12,-392.2 665.98,-410.21 713.67,-445.57 751.52,-480.05"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="250.01,-471.06 246.19,-478.03 253.52,-474.97 250.01,-471.06"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="420.38,-395.2 420.38,-428 444.38,-428 444.38,-395.2 420.38,-395.2"/>
<text xml:space="preserve" text-anchor="start" x="428.48" y="-408.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">7</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="447.38,-395.2 447.38,-428 574.78,-428 574.78,-395.2 447.38,-395.2"/>
<text xml:space="preserve" text-anchor="start" x="450.38" y="-406" font-family="Arial" font-size="14.00" fill="#c9c9c9">Issue the credential</text>
</g>
<!-- holder&#45;&gt;trustregistry -->
<g id="edge3" class="edge">
<title>holder&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M223.33,-480.19C262.54,-430.68 317.48,-372.61 380.04,-339 693.58,-170.56 1118.58,-138.84 1352.31,-135.38"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1352.11,-138.01 1359.58,-135.29 1352.04,-132.76 1352.11,-138.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="725.4,-222.61 725.4,-255.41 749.4,-255.41 749.4,-222.61 725.4,-222.61"/>
<text xml:space="preserve" text-anchor="start" x="733.51" y="-235.81" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">3</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="752.4,-222.61 752.4,-255.41 945.93,-255.41 945.93,-222.61 752.4,-222.61"/>
<text xml:space="preserve" text-anchor="start" x="755.4" y="-233.41" font-family="Arial" font-size="14.00" fill="#c9c9c9">Check the Issuer is accredited</text>
</g>
<!-- issuer&#45;&gt;baseregistry -->
<g id="edge8" class="edge">
<title>issuer&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M996.09,-537.07C1097.14,-516.19 1228.36,-489.08 1334.69,-467.12"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1335.13,-469.71 1341.94,-465.62 1334.07,-464.57 1335.13,-469.71"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1059.21,-527.07 1059.21,-559.87 1083.21,-559.87 1083.21,-527.07 1059.21,-527.07"/>
<text xml:space="preserve" text-anchor="start" x="1067.32" y="-540.27" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">8</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1086.21,-527.07 1086.21,-559.87 1282.87,-559.87 1282.87,-527.07 1086.21,-527.07"/>
<text xml:space="preserve" text-anchor="start" x="1089.21" y="-537.87" font-family="Arial" font-size="14.00" fill="#c9c9c9">Publish revocation status entry</text>
</g>
</g>
</svg>
`;case`verification`:return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.5 (0)
 -->
<!-- Pages: 1 -->
<svg width="1805pt" height="617pt"
 viewBox="0.00 0.00 1805.00 617.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 602.05)">
<g id="clust1" class="cluster">
<title>cluster_confederation</title>
<polygon fill="#2225aa" stroke="#2a2490" points="1328.46,-8 1328.46,-579 1766.83,-579 1766.83,-8 1328.46,-8"/>
<text xml:space="preserve" text-anchor="start" x="1336.46" y="-566.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#c7d2fe" fill-opacity="0.701961">FEDERAL TRUST&#45;INFRASTRUCTURE</text>
</g>
<!-- holder -->
<g id="node1" class="node">
<title>holder</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="320.04,-354 0,-354 0,-174 320.04,-174 320.04,-354"/>
<text xml:space="preserve" text-anchor="start" x="130.56" y="-267" font-family="Arial" font-size="20.00" fill="#f8fafc">Holder</text>
<text xml:space="preserve" text-anchor="start" x="46.22" y="-244" font-family="Arial" font-size="15.00" fill="#c2f0c2">Citizen using the swiyu Wallet app</text>
</g>
<!-- verifier -->
<g id="node2" class="node">
<title>verifier</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="1014.14,-326 669.71,-326 669.71,-146 1014.14,-146 1014.14,-326"/>
<text xml:space="preserve" text-anchor="start" x="810.25" y="-248" font-family="Arial" font-size="20.00" fill="#f0f9ff">Verifier</text>
<text xml:space="preserve" text-anchor="start" x="689.76" y="-225" font-family="Arial" font-size="15.00" fill="#b6ecf7">Relying party (e.g. an online shop) — OID4VP</text>
<text xml:space="preserve" text-anchor="start" x="818.17" y="-207" font-family="Arial" font-size="15.00" fill="#b6ecf7">service</text>
</g>
<!-- baseregistry -->
<g id="node3" class="node">
<title>baseregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M1726.83,-501.64C1726.83,-510.67 1646.52,-518 1547.65,-518 1448.78,-518 1368.46,-510.67 1368.46,-501.64 1368.46,-501.64 1368.46,-354.36 1368.46,-354.36 1368.46,-345.33 1448.78,-338 1547.65,-338 1646.52,-338 1726.83,-345.33 1726.83,-354.36 1726.83,-354.36 1726.83,-501.64 1726.83,-501.64"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M1726.83,-501.64C1726.83,-492.61 1646.52,-485.27 1547.65,-485.27 1448.78,-485.27 1368.46,-492.61 1368.46,-501.64"/>
<text xml:space="preserve" text-anchor="start" x="1416.58" y="-422.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1460.53" y="-440" font-family="Arial" font-size="20.00" fill="#eef2ff">Base Registry</text>
<text xml:space="preserve" text-anchor="start" x="1704.82" y="-422.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1460.53" y="-417" font-family="Arial" font-size="15.00" fill="#c7d2fe">DIDs, public keys, DID Documents,</text>
<text xml:space="preserve" text-anchor="start" x="1460.53" y="-399" font-family="Arial" font-size="15.00" fill="#c7d2fe">Token Status Lists</text>
</g>
<!-- trustregistry -->
<g id="node4" class="node">
<title>trustregistry</title>
<path fill="#6366f1" stroke="#4f46e5" stroke-width="2" d="M1709.34,-211.64C1709.34,-220.67 1636.87,-228 1547.65,-228 1458.43,-228 1385.95,-220.67 1385.95,-211.64 1385.95,-211.64 1385.95,-64.36 1385.95,-64.36 1385.95,-55.33 1458.43,-48 1547.65,-48 1636.87,-48 1709.34,-55.33 1709.34,-64.36 1709.34,-64.36 1709.34,-211.64 1709.34,-211.64"/>
<path fill="none" stroke="#4f46e5" stroke-width="2" d="M1709.34,-211.64C1709.34,-202.61 1636.87,-195.27 1547.65,-195.27 1458.43,-195.27 1385.95,-202.61 1385.95,-211.64"/>
<text xml:space="preserve" text-anchor="start" x="1434.07" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1478.02" y="-159" font-family="Arial" font-size="20.00" fill="#eef2ff">Trust Registry</text>
<text xml:space="preserve" text-anchor="start" x="1687.33" y="-132.4" font-family="Arial" font-size="14.00" fill="#eef2ff"> </text>
<text xml:space="preserve" text-anchor="start" x="1478.02" y="-136" font-family="Arial" font-size="15.00" fill="#c7d2fe">Links DIDs to accredited legal</text>
<text xml:space="preserve" text-anchor="start" x="1478.02" y="-118" font-family="Arial" font-size="15.00" fill="#c7d2fe">identities (validated by a Trust</text>
<text xml:space="preserve" text-anchor="start" x="1478.02" y="-100" font-family="Arial" font-size="15.00" fill="#c7d2fe">Authority)</text>
</g>
<!-- holder&#45;&gt;verifier -->
<g id="edge1" class="edge">
<title>holder&#45;&gt;verifier</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M329.65,-179.59C346.37,-173.77 363.34,-168.79 380.04,-165.2 479.83,-143.73 508.76,-150.09 609.71,-165.2 629.43,-168.15 649.79,-172.45 669.88,-177.48"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="328.87,-177.08 322.69,-182.08 330.64,-182.02 328.87,-177.08"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="383.04,-168.2 383.04,-201 407.04,-201 407.04,-168.2 383.04,-168.2"/>
<text xml:space="preserve" text-anchor="start" x="391.15" y="-181.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">1</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="410.04,-168.2 410.04,-201 606.71,-201 606.71,-168.2 410.04,-168.2"/>
<text xml:space="preserve" text-anchor="start" x="413.04" y="-179" font-family="Arial" font-size="14.00" fill="#c9c9c9">Request proof of age (over 18)</text>
</g>
<!-- holder&#45;&gt;verifier -->
<g id="edge4" class="edge">
<title>holder&#45;&gt;verifier</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M320,-257.45C421.59,-253.27 553.63,-247.83 659.35,-243.48"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="659.41,-246.1 666.8,-243.17 659.19,-240.86 659.41,-246.1"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="394.41,-257.94 394.41,-290.74 418.41,-290.74 418.41,-257.94 394.41,-257.94"/>
<text xml:space="preserve" text-anchor="start" x="402.52" y="-271.14" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">4</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="421.41,-257.94 421.41,-290.74 595.33,-290.74 595.33,-257.94 421.41,-257.94"/>
<text xml:space="preserve" text-anchor="start" x="424.41" y="-268.74" font-family="Arial" font-size="14.00" fill="#c9c9c9">Send proof (only &quot;over 18&quot;)</text>
</g>
<!-- holder&#45;&gt;baseregistry -->
<g id="edge2" class="edge">
<title>holder&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M319.89,-306.35C340.1,-311.44 360.53,-316.44 380.04,-321 785.96,-415.8 892.23,-476.65 1308.46,-454 1324.37,-453.13 1340.85,-451.95 1357.38,-450.55"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1357.41,-453.18 1364.65,-449.92 1356.95,-447.95 1357.41,-453.18"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="743.33,-456.92 743.33,-489.72 767.33,-489.72 767.33,-456.92 743.33,-456.92"/>
<text xml:space="preserve" text-anchor="start" x="751.43" y="-470.12" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">2</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="770.33,-456.92 770.33,-489.72 940.52,-489.72 940.52,-456.92 770.33,-456.92"/>
<text xml:space="preserve" text-anchor="start" x="773.33" y="-467.72" font-family="Arial" font-size="14.00" fill="#c9c9c9">Check requester signature</text>
</g>
<!-- holder&#45;&gt;trustregistry -->
<g id="edge3" class="edge">
<title>holder&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M286.27,-174.14C316,-155.62 348.32,-137.63 380.04,-124 501.9,-71.63 538.05,-68.27 669.71,-52.2 951.64,-17.78 1028.47,-24.3 1308.46,-72 1330.2,-75.7 1352.8,-80.58 1375.05,-86.01"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1374.4,-88.55 1382.31,-87.81 1375.66,-83.45 1374.4,-88.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="732.83,-55.2 732.83,-88 756.83,-88 756.83,-55.2 732.83,-55.2"/>
<text xml:space="preserve" text-anchor="start" x="740.93" y="-68.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">3</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="759.83,-55.2 759.83,-88 951.02,-88 951.02,-55.2 759.83,-55.2"/>
<text xml:space="preserve" text-anchor="start" x="762.83" y="-66" font-family="Arial" font-size="14.00" fill="#c9c9c9">Check requester is accredited</text>
</g>
<!-- verifier&#45;&gt;baseregistry -->
<g id="edge5" class="edge">
<title>verifier&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1013.93,-311.29C1034.02,-318.85 1054.4,-325.96 1074.14,-332 1165.86,-360.07 1270.14,-382.25 1357.36,-398.18"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1356.81,-400.75 1364.66,-399.5 1357.75,-395.58 1356.81,-400.75"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1103.6,-391.11 1103.6,-423.91 1127.6,-423.91 1127.6,-391.11 1103.6,-391.11"/>
<text xml:space="preserve" text-anchor="start" x="1111.71" y="-404.31" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">5</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1130.6,-391.11 1130.6,-423.91 1279,-423.91 1279,-391.11 1130.6,-391.11"/>
<text xml:space="preserve" text-anchor="start" x="1133.6" y="-401.91" font-family="Arial" font-size="14.00" fill="#c9c9c9">Check issuer signature</text>
</g>
<!-- verifier&#45;&gt;baseregistry -->
<g id="edge6" class="edge">
<title>verifier&#45;&gt;baseregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1013.91,-221.94C1104.48,-220.63 1215.83,-229.01 1308.46,-266.2 1319.24,-270.52 1319.17,-276.04 1328.46,-283 1351.59,-300.31 1376.67,-317.96 1401.31,-334.71"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1399.81,-336.86 1407.5,-338.89 1402.76,-332.52 1399.81,-336.86"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1077.14,-269.2 1077.14,-302 1101.14,-302 1101.14,-269.2 1077.14,-269.2"/>
<text xml:space="preserve" text-anchor="start" x="1085.25" y="-282.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">6</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1104.14,-269.2 1104.14,-302 1305.46,-302 1305.46,-269.2 1104.14,-269.2"/>
<text xml:space="preserve" text-anchor="start" x="1107.14" y="-280" font-family="Arial" font-size="14.00" fill="#c9c9c9">Check credential is not revoked</text>
</g>
<!-- verifier&#45;&gt;trustregistry -->
<g id="edge7" class="edge">
<title>verifier&#45;&gt;trustregistry</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M991.52,-146.04C1018.19,-133.71 1046.36,-122.97 1074.14,-116.2 1171.8,-92.4 1284.1,-96.35 1374.71,-106.94"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1374.32,-109.54 1382.08,-107.83 1374.95,-104.33 1374.32,-109.54"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1081.05,-119.2 1081.05,-152 1105.05,-152 1105.05,-119.2 1081.05,-119.2"/>
<text xml:space="preserve" text-anchor="start" x="1089.15" y="-132.4" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">7</text>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1108.05,-119.2 1108.05,-152 1301.56,-152 1301.56,-119.2 1108.05,-119.2"/>
<text xml:space="preserve" text-anchor="start" x="1111.05" y="-130" font-family="Arial" font-size="14.00" fill="#c9c9c9">Check issuer is still accredited</text>
</g>
</g>
</svg>
`;default:throw Error(`Unknown viewId: `+e)}};export{e as dotSource,t as svgSource};