import React from 'react';
import { loadComments } from '../../../services/comments';
import SimplePage from '../../Templates/SimpleTemplate';
import { get } from '../../../services/router';
import CommentLenta from '../../Organisms/CommentLenta/CommentLenta';
import { IComments } from '../../Organisms/IComment';
import CommentForm from '../../Organisms/CommentForm/CommentForm';
import md from '../../../services/markdown';
import 'Styles/input.scss';
import 'Styles/main.scss';
import 'Styles/comments.scss';
import './post.scss';
import { getCurrentUser } from '../../../services/user';
import { CustomButton } from '../..';

interface IProps {
    articleId: string;
}

interface IState {
    header: string;
    disclaimer: string;
    content: string;
    comments: Array<IComments>;
    authorId: number;
}

export default class Article extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { header: '', content: '', disclaimer: '', authorId: -1, comments: [] };
        document.title = this.state.header;
    }

    deleteArticle = async () => {
        const res = await fetch(`/api/post/${this.props.articleId}`, {
            method: 'delete',
        });
        const jsn = await res.json();
        if (jsn['success']) document.location.href = '/';
    };

    updateArticle = async () => {
        // режим редактирования
        // нужно перейти в редактор подобный createArticle, только в полях уже будет заготовки статьи
        throw new Error('not implemented');
    };

    getArticle = async (articleId: string) => {
        return get(`/api/post/${articleId}`);
    };

    async componentDidMount() {
        const articleId = this.props.articleId;
        const [article, comments] = await Promise.all([this.getArticle(articleId), loadComments(articleId)]);
        this.setState({ ...article, comments: comments });
        document.title = this.state.header;
    }

    onCommentChanged = (newComments: Array<IComments>) => {
        this.setState({ comments: newComments });
    };

    render() {
        const currentUser = getCurrentUser();
        let buttons: JSX.Element = <></>;
        if (currentUser && this.state.authorId === currentUser.id) {
            buttons = (
                <div className="button_block">
                    <CustomButton onClick={this.updateArticle} text="Удалить статью" />
                    <CustomButton onClick={this.deleteArticle} text="Редактировать статью" />
                </div>
            );
        }

        return (
            <div className="layout_body">
                <div className="content">
                    {buttons}
                    <article className="post_text">
                        <h1 dangerouslySetInnerHTML={{ __html: this.state.header }} />
                        <div dangerouslySetInnerHTML={{ __html: md.render(this.state.disclaimer) }} />
                        <div dangerouslySetInnerHTML={{ __html: md.render(this.state.content) }} />
                    </article>

                    <div className="comments_lenta onfullwidth" id="comments2">
                        <h3>Комментарии:</h3>
                        <CommentLenta onCommentChanged={this.onCommentChanged} comments={this.state.comments} />
                    </div>
                    <div className="new_comment_block">
                        <CommentForm onCommentChanged={this.onCommentChanged} />
                    </div>
                </div>
            </div>
        );
    }
}
