import { getData } from "./helper.js";

export function highLighter(codeText, lexTable) {
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

// тупа хайлайт кода
export async function highlightArrayOfCodeElems(elems, lexTableUrl = '/public/json/lexem_table.json') {
    if (!elems) {
        return;
    }
    
    const lexTable = await getData(lexTableUrl)
    for (let i = 0; i < elems.length; i++) {
        elems[i].innerHTML = highLighter(elems[i].innerText, lexTable);
    }
    
}


