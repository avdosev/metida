document.addEventListener('DOMContentLoaded', () => {
    const getMoreArticles = document.querySelector(".getMoreArticles")
   
    getMoreArticles.addEventListener("click", event => {      
        fetch("/getMoreArticles").then(res => {
            console.log(res)
        })
    })



    fetch('./top').then(value => {
        console.log(value);
        return value.json()
    }).then((json => {
        console.log(json)
        const insertElem = document.querySelector('.lenta')
        for (let i in json) {
            insertPostPreview(json[i], insertElem);
        }
    })).catch(error => {
        console.error(error);
    })
})

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