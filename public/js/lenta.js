var articlesCount = 2 //число статей, которые будут на странице до нажатия кнопки
//пока при нажатии подаются оставшиеся статьи
document.addEventListener('DOMContentLoaded', () => {
    const getMoreArticles = document.querySelector(".getMoreArticles")
    getArticle(articlesCount)
    getMoreArticles.addEventListener("click", event => {   
        getArticle(articlesCount)
    })
})


var currentCountOfArticles = 0; //мини костылек, не смотри сюда //это статическая переменная
/*
Если подается true, или аргументы пустуют, то мы обходим весь джсон
Если подается false, то нужно подать еще и число обхода
*/
function getArticle(articlesCount=0) {
    fetch('./top').then(value => {
        console.log(value);
        return value.json()
    }).then((json => {
        console.log(json)
        const insertElem = document.querySelector('.lenta')
        if (currentCountOfArticles >= json.length ){
            console.error("Загружены все записи")
            return
        }
        for (let i=currentCountOfArticles; i<articlesCount+currentCountOfArticles; i++) { 
            if (json[i] == undefined) {
                console.error("Все")
                break
            }
            insertPostPreview(json[i], insertElem);
        }
        currentCountOfArticles+=articlesCount;  
    })).catch(error => {
        console.error(error);
    })
}

function insertPostPreview(objPost, insertedElem) {
    const url = `/post/${objPost.id}`
    const htmlPost = `
    <div class = "post">
        <a href = "${url}"><h3>${objPost.header}<h2></a>

        <p>${objPost.disclaimer}</p>
    </div>
    `
    insertedElem.insertAdjacentHTML("beforeend", htmlPost);
}