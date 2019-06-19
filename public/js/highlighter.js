document.addEventListener('DOMContentLoaded', start);
//window.onload = start;

function start() {
    const elems = document.querySelectorAll('code');
    if (elems) {
        getData('/public/json/lexem_table.json').then(lexTable => {
            for (let i = 0; i < elems.length; i++) {
                elems[i].innerHTML = highLighter(elems[i].innerText, lexTable);
            }
        }); 
    }
}

function highLighter(codeText, lexTable) {
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

function getData(url) {
    return fetch(url).then(response => {
        if (response.ok)
            return response.text()
        else {
            return Promise.reject(['сервер что то вернул', response])
        }
    }).then(text => {
        return JSON.parse(text, (key, value) => {
            if (key === 'regexp') {
                return RegExp(value);
            } else {
                //console.log("xhr.status = " + xhr.status);
                return value;
            }
        })
    })        
}
