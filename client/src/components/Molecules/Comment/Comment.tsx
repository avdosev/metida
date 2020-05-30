import {DateToStr} from "../../Pages/Post/dateRU";
import React from "react";
import {Link} from "react-router-dom";
import {IComments} from "../../Organisms/IComment";
import {IUser} from "../../Organisms/IUser";
import CommentForm from "../../Organisms/CommentForm/CommentForm";

interface IProps {
    comment: IComments
    currentUser: IUser
    isChild?: boolean
    onCommentChanged: (comment: IComments) => void

}

interface IState {
    isReplying: boolean
}

export class Comment extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {isReplying: false}
    }

    onReplyClick = (event: any) => {
        this.setState({isReplying: true})
    }

    onCancelReplyClick = (event: any) => {
        this.setState({isReplying: false})
    }

    render() {
        const comment = this.props.comment
        const date = new Date(comment.createdAt);
        const DateStr = DateToStr(date);

        const commentId = `comment_${comment.id}`
        const authorlink = `/author/${comment.user.username}`

        const commentform = this.state.isReplying ? <CommentForm onCommentChanged={this.props.onCommentChanged}/> : <></>

        let controlBlock: JSX.Element = <></>

        // TODO мне пришлось сделать по юзернейму, т.к. с сервера не приходит айди, исправить
        if (this.props.comment.user.username === this.props.currentUser.username) { // TODO можно потом учесть, чтобы удалить и редачить могли и админы/модераторы
            controlBlock = <>
                <button className="updateComment GreyButton">Редактировать</button>
                <button className="removeComment GreyButton">Удалить</button>
            </>
        }

        return <div key={commentId} className={this.props.isChild ? "comment_childer" : "comment"} id={commentId} data-id={comment.id}>
            <div className="author_comment_block">
                <Link to={authorlink} className="author_login">{comment.user.username}</Link>
                <time className="created_commit">{DateStr}</time>
            </div>
            <div className="control_block">
                <button className="reply comment_control" data-type="create" onClick={this.onReplyClick} id={"createBtn_" + comment.id}/>
                <button className="reply comment_control" data-type="cancel" onClick={this.onCancelReplyClick} id={"cancelBtn_" + comment.id}/>
                {controlBlock}
            </div>
            <div dangerouslySetInnerHTML={{__html: comment.text}} className="comment_text"/>
            {commentform}

        </div>
        // document.querySelector(`#createBtn_${Id}`).addEventListener('click', () => {createClick(Id)})
        // document.querySelector(`#cancelBtn_${Id}`).addEventListener('click', () => {cancelClick(Id)})
    }


}


export function ChildComment(props: IProps) {
    return (<Comment onCommentChanged={props.onCommentChanged}
                     comment={props.comment}
                     currentUser={props.currentUser}
                     isChild={true}/>)
}
