import {DateToStr} from "../../Pages/Post/dateRU";
import React from "react";
import {Link} from "react-router-dom";

/**
 * Вставка комментария в хтмл
 * @param {*} objComment
 * @param {*} insertedElem
 */

interface IProps {
    comments: {
        user: { username: string },
        text: string,
        id: number,
        createdAt: Date,
    }

}

export function Comment(props: IProps) {
    const comment = props.comments
    const date = new Date(comment.createdAt);
    const DateStr = DateToStr(date);
    // TODO отрефакторить, мне пока лень разбираться в логике выдачи стилей по классам

    const commentId = `comment_${comment.id}`
    const authorlink = `/author/${comment.user.username}`


    const htmlPost =
        <div className="comment" id={commentId} data-id={comment.id}>
            <div className="author_comment_block">
                <Link to={authorlink} className="author_login">{comment.user.username}</Link>
                <time className="created_commit">{DateStr}</time>
            </div>
            <div className="control_block">
                <button className="reply comment_control" data-type="create"
                        id={"createBtn_" + comment.id}/>
                <button className="reply comment_control" data-type="cancel"
                        id={"cancelBtn_" + comment.id}/>
                <button className="updateComment GreyButton">Редактировать</button>
                <button className="removeComment GreyButton">Удалить</button>
            </div>
            <div className="comment_text"><p dangerouslySetInnerHTML={{__html: comment.text}} />  </div>

        </div>;

    return htmlPost
    // document.querySelector(`#createBtn_${Id}`).addEventListener('click', () => {createClick(Id)})
    // document.querySelector(`#cancelBtn_${Id}`).addEventListener('click', () => {cancelClick(Id)})
}