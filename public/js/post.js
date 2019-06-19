import { highLighter } from "highlighter";
import { getData } from "helper";


document.addEventListener('DOMContentLoaded', start);

function getArticleId(url) {
    var reg = new RegExp('^.+/post/')
    var newUrl = url.replace(reg, "");
    return newUrl
}

function start() {
    var deleteArticleLink = document.querySelector('.deleteAricleLink');
    var updateArticleLink = document.querySelector('.updateAricleLink');
    var options = {
        method: 'POST'
    }
    
    deleteArticleLink.addEventListener("click", () => {
        var id = getArticleId(window.location.href)
        var url = "/post/" + id + "/delete"
        
        fetch(url, options).then(res => {
            console.log(res)
            window.location.replace('/')
        })
    })

    updateArticleLink.addEventListener("click", () => {
        var id = getArticleId(window.location.href)
        var url = "/post/" + id + "/update"
        fetch(url, options).then(res => {
            console.log(res)
            ///режим редактирования
            //нужно перейти в редактор подобный createArticle, только в полях уже будет заготовки статьи
        })
    })

    // тупа хайлайт кода
    (async function highlighting() {
        const elems = document.querySelectorAll('code');
        if (!elems) {
            return;
        }
        
        const lexTable = await getData('/public/json/lexem_table.json')
        for (let i = 0; i < elems.length; i++) {
            elems[i].innerHTML = highLighter(elems[i].innerText, lexTable);
        }
        
    })();
    
}