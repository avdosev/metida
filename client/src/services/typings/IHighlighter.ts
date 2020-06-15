
interface LexRow {
    regexp: string,
    color?: string
}

interface AbstractLexTable {
    [name: string]: LexRow
}

interface LexTable extends AbstractLexTable {
    indentation: {
        "regexp": string
    },
    keywords: {
        "regexp": string,
        "color": string
    },
    ident: {
        regexp: string
    },
    string_constant: {
        regexp: string,
        color: string
    },
    operators: {
        regexp: string
    },
    comment: {
        regexp: string,
        color: string
    },
    separators: {
        regexp: string
    },
    digit_const: {
        regexp: string,
        color: string
    },
    error: {
        regexp: string
    }
}

export type {LexTable}