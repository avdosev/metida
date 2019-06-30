import { highlightArrayOfCodeElems } from "./modules/highlighter.js";

document.addEventListener('DOMContentLoaded', start);

function getArticleId(url) {
    let reg = new RegExp('^.+/post/')
    let newUrl = url.replace(reg, "");
    return newUrl
}

function start() {
    const codeElems = document.querySelectorAll('code');
    highlightArrayOfCodeElems(codeElems);
    
    let deleteArticleLink = document.querySelector('.deleteAricleLink');
    let updateArticleLink = document.querySelector('.updateAricleLink');
    let options = {
        method: 'POST'
    }
    
    deleteArticleLink.addEventListener("click", () => {
        let id = getArticleId(window.location.href)
        let url = "/post/" + id + "/delete"
        
        fetch(url, options).then(res => {
            console.log(res)
            window.location.replace('/')
        })
    })

    updateArticleLink.addEventListener("click", () => {
        let id = getArticleId(window.location.href)
        let url = "/post/" + id + "/update"
        fetch(url, options).then(res => {
            console.log(res)
            ///режим редактирования
            //нужно перейти в редактор подобный createArticle, только в полях уже будет заготовки статьи
        })
    })


}