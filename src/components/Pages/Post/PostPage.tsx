import React from "react";
import "../../input.css"
import "../../main.css"
import "./post.css"
import "../../comments.css"
import {highlightArrayOfCodeElems} from "./highlighter.js";
import {getArticleId, loadComments} from './comments.js';
import SimplePage from "../../Templates/SimplePage";
import Header from "../../Molecules/Header/Header";
import RegisterForm from "../../Organisms/RegisterForm/RegisterForm";
import Footer from "../../Organisms/Footer/Footer";
import {get} from "../../Router";
import CommentLenta from "../../Molecules/CommentLenta/CommentLenta";
import {Comment} from "../../Atoms/Comment/Comment";

interface IProps {

}

interface IState {
    header: string,
    disclaimer: string,
    content: string,
    comments: Array<JSX.Element>
}


export default class PostPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {header: '', content: '', disclaimer: '', comments: []}

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
        this.setState({...article})

        let comments = await loadComments(getArticleId())
        let lenta = []
        console.log(comments)
        comments = comments.sort((a: any, b: any) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0
        })
        console.log(comments)

        for (const comment of comments) {
            if (comment.answeringId === null) {
                lenta.push(<Comment key={comment.id} comments={comment}/>)
            } else {
                const IdChildElem = `#child_comment_${comment.answeringId}`
                lenta.push(<div className="comment_childer" id={IdChildElem}><Comment key={comment.id}
                                                                                      comments={comment}/></div>)
            }
        }

        this.setState({comments: lenta})
    }



    render() {
        console.log(this.props)
        return (<SimplePage header={<Header/>} content={<div className="layout_body">
            <div className="content">
                <button className="deleteAricleLink" onClick={this.updateArticle}>Удалить статью</button>
                <button className="updateAricleLink" onClick={this.deleteArticle}>Редактировать статью</button>
                <article className="post_text">
                    <h1 dangerouslySetInnerHTML={{__html: this.state.header}}/>
                    <p dangerouslySetInnerHTML={{__html: this.state.disclaimer}}/>
                    <p dangerouslySetInnerHTML={{__html: this.state.content}}/>
                </article>
                <div className="comments_lenta onfullwidth" id="comments">
                    <h3>Комментарии:</h3>
                    <CommentLenta>
                        {this.state.comments}
                    </CommentLenta>
                </div>
                <div className="new_comment_block">
                    <p>Зарегистрируйся, если хочешь оставить коммент</p>
                </div>
            </div>
        </div>} footer={<Footer/>}/>)

    }
}

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