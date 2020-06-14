import { getData } from "./helper.js";

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

export function highLighter(codeText: string, lexTable: LexTable) {
    let text = '';
    while (codeText.length != 0) {
        let str;
        for (let param in lexTable) {
            str = codeText.match(lexTable[param].regexp); // ищем а потом удаляем
            if (str !== null) {
                codeText = codeText.replace(lexTable[param].regexp, '');
                if (lexTable[param].color != undefined)
                    text += `<span style = 'color: ${
                        lexTable[param].color
                    }'>${str[0]}</span>`;
                else text += str[0];
                break;
            }
        }
        if (str == null) {
            console.error('you regexp don`t ready');
            break;
        }
    }
    return text;
}

