document.addEventListener('DOMContentLoaded', () => {
    const post = document.querySelector('.post_text')
    const id = post.id;
    fetch(`/post/${id}/comments`).then(value => {
        console.log(value);
        return value.json()
    }).then((json => {
        console.log(json)
        const insertElem = document.querySelector('.comments_lenta')
        insertsComments(json, insertElem);
    })).catch(error => {
        console.error(error);
    })
})


function insertsComments(objCommentArray, insertedElem) {
    for (let i = 0; i < objCommentArray.length; i++) {
        const objComment = objCommentArray[i];

        if (objComment.answeringId === null) {
            insertComment(objComment, insertedElem)
        } else {
            const childCommentElem = document.querySelector(`#child_comment_${objComment.answeringId}`)
            insertComment(objComment, childCommentElem);
        }
    }
}
const currentDate = new Date()
function insertComment(objComment, insertedElem) {
    //const AuthorUrl = ``
    const Author = objComment.author
    const Text = objComment.text
    const Id = objComment.id
    const date = new Date(objComment.createdAt)
    const DateStr = DateToStr(date);

    // впринципе можно менять
    const htmlPost = `
    <div class = "comment" id = "comment_${Id}">
        <div class = "author_comment_block">
            <a href = "/author/${Author}" class = "author_login">${Author}</a>
            <time class = "created_commit">${DateStr}</time>
        </div>
        <div class = "comment_text"><p>${Text}</p></div>
        <div class = "comment_childer" id = "child_comment_${Id}"></div>
    </div>
    `
    insertedElem.insertAdjacentHTML("beforeend", htmlPost);
}

function DateToStr(date) {
    const now = new Date()
    let str;
    const nearlyDay = date.getYear() == now.getYear() && date.getMonth() == now.getMonth()
    const subDay = now.getDate() - date.getDate()
    
    if (nearlyDay && subDay == 1) { // вчера
        str = "вчера "
    } else if (nearlyDay && subDay == 0) { // сегодня
        str = "сегодня "
    } else {
        month = [
            "Января",
            "Февраля",
            "Марта",
            "Апреля",
            "Мая",
            "Июня",
            "Июля",
            "Августа",
            "Сентября",
            "Октября",
            "Ноября",
            "Декабря"
        ]
        str = `${date.getDate()} ${month[date.getMonth()-1]} ${date.getFullYear()}`
    }

    str += ' в ' + date.toLocaleTimeString()
    return str;
}