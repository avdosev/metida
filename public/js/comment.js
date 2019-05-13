document.addEventListener('DOMContentLoaded', () => {
    const post = document.querySelector('.post_text');
    const id = post.id;
    fetch(`/post/${id}/comments`)
        .then(value => {
            console.log(value);
            return value.json();
        })
        .then(json => {
            console.log(json);
            const insertElem = document.querySelector('.comments_lenta');
            insertsComments(json, insertElem);
        })
        .catch(error => {
            console.error(error);
        });

    comment.addEventListener('input', event => {
            const commentError = document.querySelector('.commentError');
            const value = comment.value
            if (value.match(/^.{10,}/)) {
                commentError.innerHTML = '';
                commentError.className = 'commentError error';
            } else {
                commentError.innerHTML = 'Коммент уж слишком маленький. Прям как ...';
                commentError.className = 'commentError error active';
            }
        },
        false
    );

    document.addEventListener('submit', event => {
            const item = event;
            console.log('ЖМЯК', event);
            if (!comment.validity.valid) {
                commentError.innerHTML = 'ОМАГАД';
                commentError.className = 'error active';
            }
        },
        false
    );

});

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
    //const AuthorUrl = ``
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
        <div class = "comment_text"><p>${Text}</p></div>
        <div class = "control_block">
            <button class = "reply comment_control" data-type="create" style = "display: inline" onclick="createClick(${Id})"></button>
            <button class = "reply comment_control" data-type="cancel" style = "display: none" onclick="cancelClick(${Id})"></button>
        </div> 
        <div class = "comment_childer" id = "child_comment_${Id}"></div>
    </div>`;
    insertedElem.insertAdjacentHTML('beforeend', htmlPost);
}
 
// можно по другому но пока так
function createClick(id) {
    const control_block = document.querySelector(`#comment_${id} .control_block`)
    control_block.querySelector('button[data-type=create]').style.cssText = 'display: none';
    control_block.querySelector('button[data-type=cancel]').style.cssText = 'display: inline';
    
    const reply_block = `
    <div class = "new_comment reply_comment">
    <form class = "reply_comment" action="${window.location.href}/pushComment?answeringId=${id}" method="post" novalidate>
        <textarea class = "comment" name="comment" cols="30" rows="10" required='required' pattern='.{10,}'></textarea>
        <input type="submit"></input>
        <span class="commentError" aria-live="polite"></span>
    </form>
    </div>
    `
    control_block.insertAdjacentHTML('afterend', reply_block)
}

function cancelClick(id) {
    const reply_block = document.querySelector('.reply_comment')
    if (reply_block) reply_block.parentNode.removeChild(reply_block);

    document.querySelector(`#comment_${id} button[data-type=create]`).style.cssText = 'display: inline';
    document.querySelector(`#comment_${id} button[data-type=cancel]`).style.cssText = 'display: none';
} 

function DateToStr(date) {
    const now = new Date();
    let str;
    const nearlyDay =
        date.getYear() == now.getYear() && date.getMonth() == now.getMonth();
    const subDay = now.getDate() - date.getDate();

    if (nearlyDay && subDay == 1) {
        // вчера
        str = 'вчера ';
    } else if (nearlyDay && subDay == 0) {
        // сегодня
        str = 'сегодня ';
    } else {
        month = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря'
        ];
        str = `${date.getDate()} ${
            month[date.getMonth() - 1]
        } ${date.getFullYear()}`;
    }

    str += ' в ' + date.toLocaleTimeString();
    return str;
}
