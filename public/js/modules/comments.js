import { DateToStr } from "./dateRU.js";
// возможно потом понадобиться но я не уверен
import { showError, hideError, checkValidationWithRegExp } from "./input_error.js"

/**
 * из данных в хтмл/url получаем айдишник статьи
 */
export function getArticleId() {
    const post = document.querySelector('.post_text');
    const id = post.id;
    return id;
}

/**
 * загружаем заново комменты и тех что нет инсертим
 */
export async function refreshComments(post_id) {
    let comments = await loadComments(post_id)
    comments = comments.filter((comment) => {
        const hasComment = document.getElementById(`comment_${comment.id}`)
        return !hasComment
    })
    insertsComments(comments, document.querySelector('.comments_lenta'));
}

/**
 * загрузка комментов
 */
export async function loadComments(post_id) {
    const option = {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const request = await fetch(`/api/post/${post_id}/comments`, option)
    const data = await request.json()
    return data;
}

/**
 * отправка комментария
 */
export function responseComment(post_id, commentText, answeringId = null) {
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
    fetch(`/api/post/${post_id}/comments`, 
        options
    ).then(() => {
        refreshComments(post_id)
    }).catch(err => {
        // TODO: обработка ошибки
        console.error(err)
    }) 
}

/**
 * вставка комментов
 * @param {Array <Object>} objCommentArray 
 * @param {*} insertedElem туда куда будет вставляться если ответныйайдишник нулл 
 */
export function insertsComments(objCommentArray, insertedElem) {
    for (let i = 0; i < objCommentArray.length; i++) {
        const objComment = objCommentArray[i];
        
        if (objComment.answeringId === null) {
            insertComment(objComment, insertedElem);
        } else {
            const IdChildElem = `#child_comment_${objComment.answeringId}`
            const childCommentElem = document.querySelector( IdChildElem );
            insertComment(objComment, childCommentElem);
        }
    }
}

/**
 * Вставка комментария в хтмл
 * @param {*} objComment 
 * @param {*} insertedElem 
 */
export function insertComment(objComment, insertedElem) {
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
export function createClick(id) {
    // фича - убираем другие ответы
    const replyes = document.querySelectorAll('.reply_comment')
    for (const replyBlock in replyes) {
        if (replyes.hasOwnProperty(replyBlock)) {
            const element = replyes[replyBlock];
            const data_id = element.attributes['data-id'].value
            cancelClick(data_id)
        }
    }

    const control_block = document.querySelector(`#comment_${id} .control_block`)
    const insert_block = document.querySelector(`#child_comment_${id}`)

    control_block.querySelector('button[data-type=create]').style.cssText = 'display: none';
    control_block.querySelector('button[data-type=cancel]').style.cssText = 'display: inline';
    
    const reply_block = `
    <div class = "comment reply_comment" id="reply_comment_${id}" data-id="${id}"}>
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

    document.querySelector(`#reply_comment_${id} .EnterButton`).addEventListener('click', () => { 
        const post_id = getArticleId();
        responseComment(post_id, document.querySelector(`#comment_area_${id}`).value, id)
        cancelClick(id) 
    })
}

export function cancelClick(id) {
    const reply_block = document.querySelector(`#reply_comment_${id}`)
    if (reply_block) reply_block.parentNode.removeChild(reply_block);

    document.querySelector(`#comment_${id} button[data-type=create]`).style.cssText = 'display: inline';
    document.querySelector(`#comment_${id} button[data-type=cancel]`).style.cssText = 'display: none';
}