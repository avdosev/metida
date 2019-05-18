const articlesCount = 2 //число статей, которые будут на странице до нажатия кнопки
//пока при нажатии подаются оставшиеся статьи
document.addEventListener('DOMContentLoaded', () => {
    const getMoreArticles = document.querySelector(".getMoreArticles")
    getArticle(articlesCount)
    getMoreArticles.addEventListener("click", event => {   
        getArticle(articlesCount)
    })
})


var currentCountOfArticles = 0; //мини костылек, не смотри сюда //это статическая переменная

function getArticle(articlesCount=0) {
    console.log(currentCountOfArticles+articlesCount)
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
        console.log(value);
        return value.json()
    }).then((json => {
        console.log(json)
        const insertElem = document.querySelector('.lenta')

        for (let i = 0; i < json.length; i++) { 
            if (json[i] == undefined) {
                console.error("Все")
                break
            }
            insertPostPreview(json[i], insertElem);
        }
        currentCountOfArticles+=json.length;  
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