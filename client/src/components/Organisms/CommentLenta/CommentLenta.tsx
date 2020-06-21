import React from "react";
import Comment from "../../Atoms/Comment/Comment";
import {IComments, ITreeComments} from "../IComment";
import {loginQuery} from "../../../services/FormHelper";
import {getCurrentUser} from "../../../services/user";
import {IPrivateUser, IPublicUser} from "../IPrivateUser";


interface IProps {
    comments: Array<IComments>
    onCommentChanged: (comment: Array<IComments>) => void
}


function buildTreeComments(comments: Array<IComments>): Array<ITreeComments> {
    const initialComments: Map<number, IComments> = new Map()
    for (const comment of comments) {
        initialComments.set(comment.id, comment)
    }


    const arrayOfChilds: Map<number | null, Array<IComments>> = new Map<number | null, Array<IComments>>()
    for (const comment of comments) {
        if (arrayOfChilds.has(comment.answeringId)) {
            arrayOfChilds.get(comment.answeringId)?.push(comment)
        } else {
            arrayOfChilds.set(comment.answeringId, [comment])
        }
    }

    function buildTree(parent: IComments): ITreeComments {
        const childs = arrayOfChilds.get(parent.id) ?? []
        const tree: ITreeComments = {
            comment: parent,
            childs: childs.map(buildTree)
        }
        return tree
    }

    const res = (arrayOfChilds.get(null) ?? []).map(buildTree);
    return res;
}


export default function CommentLenta(props: IProps) {
    let user:IPublicUser | null
    user = getCurrentUser()

    const treeComments = buildTreeComments(props.comments);

    return (
        <div className="lenta">
            {treeComments.map(treeComment => <Comment key={treeComment.comment.id} comment={treeComment} currentUser={user} onCommentChanged={props.onCommentChanged}/>)}
        </div>
    )

}