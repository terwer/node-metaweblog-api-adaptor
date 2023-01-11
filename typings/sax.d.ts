declare module "sax" {
  export class SAXParser {
    constructor(strict: any, opt: any)

    close(): any

    end(): void

    flush(): void

    resume(): any

    write(chunk: any): any
  }

  export class SAXStream {
    constructor(strict: any, opt: any)

    end(chunk: any): any

    on(ev: any, handler: any, ...args: any[]): any

    write(data: any): any
  }

  export const ENTITIES: {
    AElig: string
    Aacute: string
    Acirc: string
    Agrave: string
    Alpha: string
    Aring: string
    Atilde: string
    Auml: string
    Beta: string
    Ccedil: string
    Chi: string
    Dagger: string
    Delta: string
    ETH: string
    Eacute: string
    Ecirc: string
    Egrave: string
    Epsilon: string
    Eta: string
    Euml: string
    Gamma: string
    Iacute: string
    Icirc: string
    Igrave: string
    Iota: string
    Iuml: string
    Kappa: string
    Lambda: string
    Mu: string
    Ntilde: string
    Nu: string
    OElig: string
    Oacute: string
    Ocirc: string
    Ograve: string
    Omega: string
    Omicron: string
    Oslash: string
    Otilde: string
    Ouml: string
    Phi: string
    Pi: string
    Prime: string
    Psi: string
    Rho: string
    Scaron: string
    Sigma: string
    THORN: string
    Tau: string
    Theta: string
    Uacute: string
    Ucirc: string
    Ugrave: string
    Upsilon: string
    Uuml: string
    Xi: string
    Yacute: string
    Yuml: string
    Zeta: string
    aacute: string
    acirc: string
    acute: string
    aelig: string
    agrave: string
    alefsym: string
    alpha: string
    amp: string
    and: string
    ang: string
    apos: string
    aring: string
    asymp: string
    atilde: string
    auml: string
    bdquo: string
    beta: string
    brvbar: string
    bull: string
    cap: string
    ccedil: string
    cedil: string
    cent: string
    chi: string
    circ: string
    clubs: string
    cong: string
    copy: string
    crarr: string
    cup: string
    curren: string
    dArr: string
    dagger: string
    darr: string
    deg: string
    delta: string
    diams: string
    divide: string
    eacute: string
    ecirc: string
    egrave: string
    empty: string
    emsp: string
    ensp: string
    epsilon: string
    equiv: string
    eta: string
    eth: string
    euml: string
    euro: string
    exist: string
    fnof: string
    forall: string
    frac12: string
    frac14: string
    frac34: string
    frasl: string
    gamma: string
    ge: string
    gt: string
    hArr: string
    harr: string
    hearts: string
    hellip: string
    iacute: string
    icirc: string
    iexcl: string
    igrave: string
    image: string
    infin: string
    int: string
    iota: string
    iquest: string
    isin: string
    iuml: string
    kappa: string
    lArr: string
    lambda: string
    lang: string
    laquo: string
    larr: string
    lceil: string
    ldquo: string
    le: string
    lfloor: string
    lowast: string
    loz: string
    lrm: string
    lsaquo: string
    lsquo: string
    lt: string
    macr: string
    mdash: string
    micro: string
    middot: string
    minus: string
    mu: string
    nabla: string
    nbsp: string
    ndash: string
    ne: string
    ni: string
    not: string
    notin: string
    nsub: string
    ntilde: string
    nu: string
    oacute: string
    ocirc: string
    oelig: string
    ograve: string
    oline: string
    omega: string
    omicron: string
    oplus: string
    or: string
    ordf: string
    ordm: string
    oslash: string
    otilde: string
    otimes: string
    ouml: string
    para: string
    part: string
    permil: string
    perp: string
    phi: string
    pi: string
    piv: string
    plusmn: string
    pound: string
    prime: string
    prod: string
    prop: string
    psi: string
    quot: string
    rArr: string
    radic: string
    rang: string
    raquo: string
    rarr: string
    rceil: string
    rdquo: string
    real: string
    reg: string
    rfloor: string
    rho: string
    rlm: string
    rsaquo: string
    rsquo: string
    sbquo: string
    scaron: string
    sdot: string
    sect: string
    shy: string
    sigma: string
    sigmaf: string
    sim: string
    spades: string
    sub: string
    sube: string
    sum: string
    sup: string
    sup1: string
    sup2: string
    sup3: string
    supe: string
    szlig: string
    tau: string
    there4: string
    theta: string
    thetasym: string
    thinsp: string
    thorn: string
    tilde: string
    times: string
    trade: string
    uArr: string
    uacute: string
    uarr: string
    ucirc: string
    ugrave: string
    uml: string
    upsih: string
    upsilon: string
    uuml: string
    weierp: string
    xi: string
    yacute: string
    yen: string
    yuml: string
    zeta: string
    zwj: string
    zwnj: string
  }

  export const EVENTS: string[]

  export const MAX_BUFFER_LENGTH: number

  export const STATE: {
    "0": string
    "1": string
    "10": string
    "11": string
    "12": string
    "13": string
    "14": string
    "15": string
    "16": string
    "17": string
    "18": string
    "19": string
    "2": string
    "20": string
    "21": string
    "22": string
    "23": string
    "24": string
    "25": string
    "26": string
    "27": string
    "28": string
    "29": string
    "3": string
    "30": string
    "31": string
    "32": string
    "33": string
    "34": string
    "35": string
    "4": string
    "5": string
    "6": string
    "7": string
    "8": string
    "9": string
    ATTRIB: number
    ATTRIB_NAME: number
    ATTRIB_NAME_SAW_WHITE: number
    ATTRIB_VALUE: number
    ATTRIB_VALUE_CLOSED: number
    ATTRIB_VALUE_ENTITY_Q: number
    ATTRIB_VALUE_ENTITY_U: number
    ATTRIB_VALUE_QUOTED: number
    ATTRIB_VALUE_UNQUOTED: number
    BEGIN: number
    BEGIN_WHITESPACE: number
    CDATA: number
    CDATA_ENDING: number
    CDATA_ENDING_2: number
    CLOSE_TAG: number
    CLOSE_TAG_SAW_WHITE: number
    COMMENT: number
    COMMENT_ENDED: number
    COMMENT_ENDING: number
    COMMENT_STARTING: number
    DOCTYPE: number
    DOCTYPE_DTD: number
    DOCTYPE_DTD_QUOTED: number
    DOCTYPE_QUOTED: number
    OPEN_TAG: number
    OPEN_TAG_SLASH: number
    OPEN_WAKA: number
    PROC_INST: number
    PROC_INST_BODY: number
    PROC_INST_ENDING: number
    SCRIPT: number
    SCRIPT_ENDING: number
    SGML_DECL: number
    SGML_DECL_QUOTED: number
    TEXT: number
    TEXT_ENTITY: number
  }

  export const XML_ENTITIES: {
    amp: string
    apos: string
    gt: string
    lt: string
    quot: string
  }

  export function createStream(strict: any, opt: any): any

  export function parser(strict: any, opt: any): any
}
