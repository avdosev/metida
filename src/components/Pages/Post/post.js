import { highlightArrayOfCodeElems } from "../../../js/modules/highlighter.js";

import { showError, hideError, checkValidationWithRegExp } from "../input_error.js"
import { refreshComments, responseComment, getArticleId } from '../../../js/modules/comments.js';

document.addEventListener('DOMContentLoaded', start);

async function start() {
    const codeElems = document.querySelectorAll('code');
    highlightArrayOfCodeElems(codeElems);
    
    const deleteArticleLink = document.querySelector('.deleteAricleLink');
    const updateArticleLink = document.querySelector('.updateAricleLink');

    
    deleteArticleLink.addEventListener("click", async () => {
        const res = await fetch(`/api/post/${getArticleId()}`, {
            method: "delete"
        });
        const jsn = await res.json();
        if (jsn["success"])
            document.location.href = '/';
    });

    updateArticleLink.addEventListener("click", () => {
        // режим редактирования
        // нужно перейти в редактор подобный createArticle, только в полях уже будет заготовки статьи
    })

    const commentError = document.querySelector('.commentError');
    const comment = document.querySelector('.comment_area') //я не могу с жить с ошибкой
    const sendCommentBtn = document.querySelector(".EnterButton")
    
    refreshComments(getArticleId())

    const validators = await fetch('/public/json/input_errors.json').then(response => {
        if (response.ok)
            return response.json()
        else 
            console.log('с джсоном какая то проблема', response)
    });

    if (sendCommentBtn) sendCommentBtn.addEventListener("click", (event) => {
        if ( !comment.value.match(validators.comment.regexp)  )  {
            commentError.innerHTML = validators.comment.EventError[0];
            commentError.className = 'commentError error active';
             //не пускаем его дальше
        } else {
            responseComment(getArticleId(), comment.value) 
        }
    });

    if (comment) comment.addEventListener('input', () => {
            checkValidationWithRegExp(comment, commentError, validators.comment)
        },
        false
    );
};