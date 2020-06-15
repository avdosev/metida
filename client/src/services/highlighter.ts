import { getData } from "./helper.js";
import {LexTable} from "./typings/IHighlighter";


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

