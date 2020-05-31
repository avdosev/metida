import React from "react";
import Comment from "../../Molecules/Comment/Comment";
import {IComments, ITreeComments} from "../IComment";
import {loginQuery} from "../Form/FormHelper";
import {getCurrentUser} from "../../../services/user";
import {IPrivateUser, IPublicUser} from "../IPrivateUser";


interface IProps {
    comments: Array<IComments>
    onCommentChanged: (comment: Array<IComments>) => void
}


export default function CommentLenta(props: IProps) {
    console.log(props.comments)

    let user:IPublicUser | null

    try {
        user = getCurrentUser()
    } catch (e) {
        user = null
    }

    function buildTreeComments(comments: Array<IComments>): Map<number, ITreeComments> {
        const res = new Map<number, ITreeComments>();
        for (const comment of comments) {
            
        }
        return res;
    }

    const treeComments = buildTreeComments(props.comments);
    // realComments.push(<Comment key={comment.id} currentUser={user} comment={comment} onCommentChanged={props.onCommentChanged}/>
    
    console.log(treeComments)

    return (<div className="lenta">
        {}
    </div>)

}

// TODO возможно, тут будет проблема, что я тут использую тег, которого не было в оригинале