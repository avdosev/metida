import React from "react";
import "../../input.css"
import "../../main.css"
import "./post.css"
import "../../comments.css"
// import { highlightArrayOfCodeElems } from "./modules/highlighter.js";
//
// import { showError, hideError, checkValidationWithRegExp } from "../components/Pages/input_error.js"
// import { refreshComments, responseComment, getArticleId } from './modules/comments.js';


interface IProps {

}

interface IState {

}


export default class Post extends React.Component<IProps, IState>{
    deleteArticle = async () => {
        // const res = await fetch(`/api/post/${getArticleId()}`, {
        //     method: "delete"
        // });
        // const jsn = await res.json();
        // if (jsn["success"])
        //     document.location.href = '/';
    }

    updateArticle = async () => {
        // режим редактирования
        // нужно перейти в редактор подобный createArticle, только в полях уже будет заготовки статьи
        throw new Error('not implemented');
    }

    render() {
        return (
            <div className="layout_body">
                <div className="content">
                    <button className="deleteAricleLink">Удалить статью</button>
                    <button className="updateAricleLink" onClick={this.deleteArticle}>Редактировать статью</button>
                    <article className="post_text">
                        <h1></h1>
                    </article>
                    <div className="comments_lenta onfullwidth" id="comments">
                        <h3>Комментарии:</h3>
                    </div>
                    <div className="new_comment_block">
                        <p>Зарегистрируйся, если хочешь оставить коммент</p>
                    </div>
                </div>
            </div>
        );
    }
}

//
// async function start() {
//     const codeElems = document.querySelectorAll('code');
//     highlightArrayOfCodeElems(codeElems);
//
//     const deleteArticleLink = document.querySelector('.deleteAricleLink');
//     const updateArticleLink = document.querySelector('.updateAricleLink');
//
//     const commentError = document.querySelector('.commentError');
//     const comment = document.querySelector('.comment_area') //я не могу с жить с ошибкой
//     const sendCommentBtn = document.querySelector(".EnterButton")
//
//     refreshComments(getArticleId())
//
//     const validators = await fetch('/public/json/input_errors.json').then(response => {
//         if (response.ok)
//             return response.json()
//         else
//             console.log('с джсоном какая то проблема', response)
//     });
//
//     if (sendCommentBtn) sendCommentBtn.addEventListener("click", (event) => {
//         if ( !comment.value.match(validators.comment.regexp)  )  {
//             commentError.innerHTML = validators.comment.EventError[0];
//             commentError.className = 'commentError error active';
//             //не пускаем его дальше
//         } else {
//             responseComment(getArticleId(), comment.value)
//         }
//     });
//
//     if (comment) comment.addEventListener('input', () => {
//             checkValidationWithRegExp(comment, commentError, validators.comment)
//         },
//         false // объясни потом, что значит этот бул // хз че он значит
//     );
// };