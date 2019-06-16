const articlesCount = 10 //число статей, которые будут на странице до нажатия кнопки
//пока при нажатии подаются оставшиеся статьи
document.addEventListener('DOMContentLoaded', () => {
    const getMoreArticles = document.querySelector(".getMoreArticles")
    const confirmEmail = document.querySelector(".confirmEmail")

    getArticle(articlesCount)

    getMoreArticles.addEventListener("click", () => {   
        getArticle(articlesCount)
    })

    confirmEmail.addEventListener("click", () => {
        //именно в этот момент, я считаю, мы должны считать емейл юзера и сформировать сообщение для почты
        //тут же меняем ошибку на ui, если сообщение отправлено, и если нет, тоже меняем
        //fetch("/emailMessage")
    })

    fetch()
})

var currentCountOfArticles = 0; //мини костылек, не смотри сюда //это статическая переменная

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
        console.log(json);
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
        <div class="title">
            <a href = "${url}"><h3>${objPost.header}</h3></a>
        </div>
        <div class="disclaimer">
            <p>${objPost.disclaimer}</p>
        </div> 
        <a href="${url}" class="BtnToArticle">Читать дальше</a>
    </div>
    `
    insertedElem.insertAdjacentHTML("beforeend", htmlPost);
}

