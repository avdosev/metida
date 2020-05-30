import React from "react";
import {ChildComment, Comment} from "../../Molecules/Comment/Comment";
import {IComments} from "../IComment";
import {loginQuery} from "../Form/FormHelper";
import {getCurrentUser} from "../../../services/user";
import {IUser} from "../IUser";


interface IProps {
    comments: Array<IComments>
    onCommentChanged: (comment: IComments) => void
}


export default function CommentLenta(props: IProps) {

    const initialComments: Map<number, IComments> = new Map()
    for (const comment of props.comments) {
        initialComments.set(comment.id, comment)
    }

    let arrayOfChilds: Map<number, Array<number>> = new Map<number, Array<number>>()
    for (const baseComment of props.comments) {
        if (!baseComment.answeringId) {
            let arrayOfOneComment: number[] = []
            for (const comment of props.comments) {
                if (comment.answeringId && (arrayOfOneComment.includes(comment.answeringId) || baseComment.id == comment.answeringId)) {
                    arrayOfOneComment.push(comment.id)
                }
            }
            arrayOfChilds.set(baseComment.id, arrayOfOneComment)
        }
    }



    const User:IUser = getCurrentUser()



    let realComments = []
    for (const firstLevelComments of arrayOfChilds.entries()) {
        const comment = initialComments.get(firstLevelComments[0])
        if (comment)
            realComments.push(<Comment currentUser={User} comment={comment} onCommentChanged={props.onCommentChanged}/>)
        for (const secondLevelComments of firstLevelComments[1]) {
            const innerComment = initialComments.get(secondLevelComments)
            if (innerComment)
                realComments.push(<ChildComment currentUser={User} comment={innerComment} onCommentChanged={props.onCommentChanged} />)
        }
    }


    return (<div className="lenta">
        {realComments}
    </div>)

}

// TODO возможно, тут будет проблема, что я тут использую тег, которого не было в оригинале