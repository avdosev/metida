import React from "react";
import "../../styles/input.scss"
import "../../styles/main.scss"
import "./post.scss"
import "../../styles/comments.scss"
import {getArticleId, loadComments} from '../../../services/comments';
import SimplePage from "../../Templates/SimpleTemplate";
import {get} from "../../../services/router";
import {Redirect} from "react-router-dom"
import {isAuth} from "../../../services/user";
import CommentLenta from "../../Organisms/CommentLenta/CommentLenta";
import {IComments} from "../../Organisms/IComment";
import CommentForm from "../../Organisms/CommentForm/CommentForm";
import {md} from "../../../config/markdown"


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
        document.title = this.state.header;

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

    getArticle = async (articleId: string) => {
        return get(`/api/post/${articleId}`)
    }

    async componentDidMount() {
        const articleId = getArticleId()
        const [article, comments] = await Promise.all([
            this.getArticle(articleId), loadComments(articleId) //, getData(lexTableUrl)
        ])
        this.setState({...article, comments: comments})
        console.log(this.state)
        document.title = this.state.header;
    }

    onCommentChanged = (newComments: Array<IComments>) => {
        this.setState({comments: newComments})
    }

    render() {
        console.log(this.state.content)
        return (<SimplePage>
            <div className="layout_body">
            <div className="content">
                <button className="deleteAricleLink" onClick={this.updateArticle}>Удалить статью</button>
                <button className="updateAricleLink" onClick={this.deleteArticle}>Редактировать статью</button>
                <article className="post_text">
                    <h1 dangerouslySetInnerHTML={{__html: this.state.header}}/>
                    <div dangerouslySetInnerHTML={{__html: md.render(this.state.disclaimer)}}/>
                    <div dangerouslySetInnerHTML={{__html: md.render(this.state.content)}}/>
                </article>

                <div className="comments_lenta onfullwidth" id="comments2">
                    <h3>Комментарии:</h3>
                    <CommentLenta onCommentChanged={this.onCommentChanged} comments={this.state.comments}/>
                </div>
                <div className="new_comment_block">
                    <CommentForm onCommentChanged={this.onCommentChanged}/>
                </div>
            </div>
        </div>
        </SimplePage>)

    }
}