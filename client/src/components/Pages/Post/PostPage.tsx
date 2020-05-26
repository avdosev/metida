import React from "react";
import "../../input.css"
import "../../main.css"
import "./post.css"
import "../../comments.css"
import {highlightArrayOfCodeElems} from "./highlighter.js";
import {getArticleId, loadComments} from './comments.js';
import SimplePage from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import RegisterForm from "../../Organisms/RegisterForm/RegisterForm";
import Footer from "../../Organisms/Footer/Footer";
import {get} from "../../Router";
import CommentLenta from "../../Organisms/CommentLenta/CommentLenta";
import {Comment} from "../../Molecules/Comment/Comment";
import {IComments} from "../../IComment";

interface IProps {

}

interface IState {
    header: string,
    disclaimer: string,
    content: string,
    comments: Array<IComments>
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

        document.title = this.state.header;
        let comments = await loadComments(getArticleId())

        this.setState({comments: comments})
    }



    render() {
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
                    <CommentLenta comments={this.state.comments}/>

                </div>
                <div className="new_comment_block">
                    <p>Зарегистрируйся, если хочешь оставить коммент</p>
                </div>
            </div>
        </div>} footer={<Footer/>}/>)

    }
}