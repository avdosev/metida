document.addEventListener('DOMContentLoaded', start);
//window.onload = start;

function start() {
    highLighter(document.querySelector('code.js-language'), 'lexem_table.json');
}

function highLighter(element, configUrl) {
    var codeText = element.textContent;
    getData('/public/json/' + configUrl, initHighLighter); // тут я так понимаю неверный путь
    // да тут должнен быть другой юрл
    // типо такого metida.com/api/getpublicfile/namejsconfig
    // и тогда будет нормальный запрос
    function initHighLighter(lexTable) {
        var text = '';
        while (codeText.length != 0) {
            for (var param in lexTable) {
                var str = codeText.match(lexTable[param].regexp); // ищем а потом удаляем
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
                alert('you regexp don`t ready');
                break;
            }
            // console.log(codeText); //пользователю не нужно такое логирование
        }
        element.innerHTML = text;
    }
}

function getData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onerror = function() {
        console.log('error' + xhr.status);
    };
    xhr.upload.onerror = function() {
        console.log('error' + xhr.status);
    };

    xhr.onloadend = function() {
        if (xhr.status == 404) throw new Error(url + ' replied 404');
    };
    xhr.onreadystatechange = function() {
        //console.log(xhr.responseText);
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status === 200) {
            //console.log(xhr.responseText)
            callback(
                JSON.parse(xhr.responseText, function(key, value) {
                    if (key === 'regexp') {
                        return RegExp(value);
                    } else {
                        //console.log("xhr.status = " + xhr.status);
                        return value;
                    }
                })
            );
        }
    };
}
