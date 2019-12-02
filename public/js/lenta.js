import { insertPostPreview } from "./modules/articles.js"

const articlesCount = 10; //число статей, которые будут на странице до нажатия кнопки
//пока при нажатии подаются оставшиеся статьи
document.addEventListener('DOMContentLoaded', () => {
    const getMoreArticles = document.querySelector(".getMoreArticles")
    const confirmEmail = document.querySelector(".confirmEmail")

    getArticle(articlesCount)

    getMoreArticles.addEventListener("click", () => {   
        getArticle(articlesCount)
    })

});

let currentCountOfArticles = 0; //мини костылек, не смотри сюда //это статическая переменная

function getArticle(articlesCount=0) {
    fetch('./top', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "begin": currentCountOfArticles,
            "end": currentCountOfArticles+articlesCount
        })
    }).then(value => {
        return value.json()
    }).then((json => {
        const insertElem = document.querySelector('.lenta')

        for (let i = 0; i < json.length; i++) { 
            if (json[i] == undefined) {
                console.error("Все");
                break
            }
            insertPostPreview(json[i], insertElem);
        }
        currentCountOfArticles+=json.length;  
    })).catch(error => {
        console.error(error);
    })
}



