import React from "react";
import "../../input.css"
import "../../main.css"
import "./post.css"
import "../../comments.css"
import { highlightArrayOfCodeElems } from "./highlighter.js";
import { refreshComments, responseComment, getArticleId } from './comments.js';
import SimplePage from "../../Templates/SimplePage";
import Header from "../../Molecules/Header/Header";
import RegisterForm from "../../Organisms/RegisterForm/RegisterForm";
import Footer from "../../Organisms/Footer/Footer";
import {logger} from "sequelize/types/lib/utils/logger";
import {get} from "../../Router";


interface IProps {

}

interface IState {
    header: string,
    disclaimer: string,
    content: string
}


export default class PostPage extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {header: '', content: '', disclaimer: ''}

    }
    deleteArticle = async () => {
        const res = await fetch(`/api/post/${getArticleId()}`, {
            method: "delete"
        });
        const jsn = await res.json();
        if (jsn["success"])
            document.location.href = '/';
    }

    updateArticle = async () => {
        // режим редактирования
        // нужно перейти в редактор подобный createArticle, только в полях уже будет заготовки статьи
        throw new Error('not implemented');
    }

    async componentDidMount() {
        const article = await get(`/api/post/${getArticleId()}`)
        this.setState({name: article.name, ...article})
        console.log(this.state)
    }

    render() {
        console.log(this.props)
        return (<SimplePage header={<Header />} content={ <div className="layout_body">
            <div className="content">
                <button className="deleteAricleLink" onClick={this.updateArticle}>Удалить статью</button>
                <button className="updateAricleLink" onClick={this.deleteArticle}>Редактировать статью</button>
                <article className="post_text">
                    <h1 dangerouslySetInnerHTML={{__html: this.state.header}} />
                    <p dangerouslySetInnerHTML={{__html: this.state.disclaimer}} />
                    <p dangerouslySetInnerHTML={{__html: this.state.content}} />
                </article>
                <div className="comments_lenta onfullwidth" id="comments">
                    <h3>Комментарии:</h3>
                </div>
                <div className="new_comment_block">
                    <p>Зарегистрируйся, если хочешь оставить коммент</p>
                </div>
            </div>
        </div>} footer={<Footer/>} />)

    }
}

//
// import { highlightArrayOfCodeElems } from "../../../js/modules/highlighter.js";
//
// import { showError, hideError, checkValidationWithRegExp } from "../input_error.js"
// import { refreshComments, responseComment, getArticleId } from '../../../js/modules/comments.js';
//
// document.addEventListener('DOMContentLoaded', start);
//
// async function start() {
//     const codeElems = document.querySelectorAll('code');
//     highlightArrayOfCodeElems(codeElems);
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
//         false
//     );
//};