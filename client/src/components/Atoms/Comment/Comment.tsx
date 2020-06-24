import { DateToStr } from '../../../services/dateRU';
import React from 'react';
import { Link } from 'react-router-dom';
import { IComments, ITreeComments } from '../../Organisms/IComment';
import { IPrivateUser, IPublicUser } from '../../Organisms/IPrivateUser';
import CommentForm from '../../Organisms/CommentForm/CommentForm';

interface IProps {
    comment: ITreeComments;
    currentUser: IPublicUser | null;
    onCommentChanged: (comment: Array<IComments>) => void;
}

interface IState {
    isReplying: boolean;
}

export default class Comment extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = { isReplying: false };
    }

    onReplyClick = (event: any) => {
        this.setState({ isReplying: !this.state.isReplying });
    };

    onChanged = () => {
        this.setState({ isReplying: !this.state.isReplying });
    };

    render() {
        const comment = this.props.comment.comment;
        const date = new Date(comment.createdAt);
        const DateStr = DateToStr(date);

        const commentId = `comment_${comment.id}`;
        const authorlink = `/author/${comment.user.username}`;

        const commentform = this.state.isReplying ? (
            <CommentForm
                replyCommentId={comment.id}
                replyCommentAuthorName={comment.user.username}
                onReplyCommentSend={this.onChanged}
                onCommentChanged={this.props.onCommentChanged}
            />
        ) : (
            <></>
        );

        let controlBlock: JSX.Element = <></>;
        let replyButton: JSX.Element = <></>;

        if (this.props.currentUser) {
            replyButton = (
                <button className="reply comment_control" onClick={this.onReplyClick} id={'createBtn_' + comment.id}>
                    {this.state.isReplying ? 'Отмена' : 'Ответить'}
                </button>
            );

            if (comment.user.username === this.props.currentUser.username) {
                // TODO можно потом учесть, что удалить и редачить могли и админы/модераторы
                // TODO мне пришлось сделать по юзернейму, т.к. с сервера не приходит айди, исправить

                controlBlock = (
                    <>
                        <button className="updateComment GreyButton">Редактировать</button>
                        <button className="removeComment GreyButton">Удалить</button>
                    </>
                );
            }
        }

        return (
            <div key={commentId} className="comment" id={commentId} data-id={comment.id}>
                <div className="author_comment_block">
                    <Link to={authorlink} className="author_login">
                        {comment.user.username}
                    </Link>
                    <time className="created_commit"> {DateStr}</time>
                </div>
                <div className="control_block">
                    {replyButton}
                    {controlBlock}
                </div>
                <div dangerouslySetInnerHTML={{ __html: comment.text }} className="comment_text" />
                {commentform}
                <div className="comment_childer">
                    {this.props.comment.childs?.map((treecomment) => (
                        <Comment
                            key={treecomment.comment.id}
                            comment={treecomment}
                            currentUser={this.props.currentUser}
                            onCommentChanged={this.props.onCommentChanged}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
