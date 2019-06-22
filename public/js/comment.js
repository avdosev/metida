import { DateToStr } from "/public/js/modules/dateRU.js";
import { showError, hideError } from "/public/js/modules/input_error.js"

let post;
let id;

document.addEventListener('DOMContentLoaded', async () => {

    post = document.querySelector('.post_text');
    id = post.id;

    const commentError = document.querySelector('.commentError');
    const comment = document.querySelector('.comment_area') //я не могу с жить с ошибкой
    const sendCommentBtn = document.querySelector(".EnterButton")
    
    fetch(`/post/${id}/comments`).then(value => {
        console.log(value);
        return value.json();
    }).then(json => {
        console.log(json);
        const insertElem = document.querySelector('.comments_lenta');
        insertsComments(json, insertElem);
    }).catch(error => {
        console.error(error);
    });

    const validators = await fetch('/public/json/input_errors.json').then(response => {
        if (response.ok)
            return response.json()
        else 
            console.log('с джсоном какая то проблема', response)
    })

    sendCommentBtn.addEventListener("click", (event) => {
        if ( !comment.value.match(validators.comment.regexp)  )  {
            commentError.innerHTML = validators.comment.EventError[0];
            commentError.className = 'commentError error active';
             //не пускаем его дальше
        }
        else {
            responseComment(comment.value) 
        }
    })

    comment.addEventListener('input', () => {
            if (comment.value.match(validators.comment.regexp)) { 
                hideError(commentError)
            } else {
                showError(commentError, validators.comment.Error)
            }
        },
        false //объясни потом, что значит этот бул
    );
});

function refreshComments() {
    // TODO правильная подгрузка коммментов
    // загружаем заново комменты и тех что нет инсертим
    window.location.reload();
}

function responseComment(commentText, answeringId = null) {
    const options = {
        method:"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "comment": commentText,
            answeringId
        })
    }
    fetch(`/post/${id}/pushComment`, 
        options
    ).then(() => {
        refreshComments()
    }).catch(err => {
        // TODO: обработка ошибки
        console.error(err)
    }) 
}


function insertsComments(objCommentArray, insertedElem) {
    for (let i = 0; i < objCommentArray.length; i++) {
        const objComment = objCommentArray[i];

        if (objComment.answeringId === null) {
            insertComment(objComment, insertedElem);
        } else {
            const childCommentElem = document.querySelector(
                `#child_comment_${objComment.answeringId}`
            );
            insertComment(objComment, childCommentElem);
        }
    }
}

function insertComment(objComment, insertedElem) {
    const Author = objComment.author;
    const Text = objComment.text;
    const Id = objComment.id;
    const date = new Date(objComment.createdAt);
    const DateStr = DateToStr(date);
    // впринципе можно менять
    const htmlPost = `
    <div class = "comment" id = "comment_${Id}" data-id = "${Id}">
        <div class = "author_comment_block">
            <a href = "/author/${Author}" class = "author_login">${Author}</a>
            <time class = "created_commit">${DateStr}</time>
        </div>
        <div class = "control_block">
            <button class = "reply comment_control" data-type="create" style = "display: inline" id="createBtn_${Id}"></button>
            <button class = "reply comment_control" data-type="cancel" style = "display: none" id="cancelBtn_${Id}"></button>
            <button class = "updateComment GreyButton">Редактировать</button>
            <button class = "removeComment GreyButton">Удалить</button>
        </div> 
        <div class = "comment_text">${Text}</div>
        <div class = "comment_childer" id = "child_comment_${Id}"></div>
    </div>`;

    insertedElem.insertAdjacentHTML('beforeend', htmlPost);

    document.querySelector(`#createBtn_${Id}`).addEventListener('click', () => {createClick(Id)})
    document.querySelector(`#cancelBtn_${Id}`).addEventListener('click', () => {cancelClick(Id)})
}
 
// можно по другому но пока так
function createClick(id) {
    const control_block = document.querySelector(`#comment_${id} .control_block`)
    const insert_block = document.querySelector(`#child_comment_${id}`)

    control_block.querySelector('button[data-type=create]').style.cssText = 'display: none';
    control_block.querySelector('button[data-type=cancel]').style.cssText = 'display: inline';
    
    const reply_block = `
    <div class = "comment reply_comment" id="reply_comment_${id}">
        <textarea class = "comment_area" id="comment_area_${id}" name="comment" cols="30" rows="10" required='required' pattern='.{10,}'></textarea>
        <div class = "button">
            <button class = "EnterButton">
                Отправить
            </button>
        </div>
        <span class="commentError" aria-live="polite"></span>
    </div>
    `
    insert_block.insertAdjacentHTML('beforebegin', reply_block)

    document.querySelector(`#reply_comment_${id} .EnterButton`).addEventListener('click', () => { responseComment(document.querySelector(`#comment_area_${id}`).value, id) })
}

function cancelClick(id) {
    const reply_block = document.querySelector('.reply_comment')
    if (reply_block) reply_block.parentNode.removeChild(reply_block);

    document.querySelector(`#comment_${id} button[data-type=create]`).style.cssText = 'display: inline';
    document.querySelector(`#comment_${id} button[data-type=cancel]`).style.cssText = 'display: none';
}