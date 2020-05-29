import React from "react";
import {ChildComment, Comment} from "../../Molecules/Comment/Comment";
import {IComments} from "../../IComment";
import {loginQuery} from "../Form/FormHelper";


interface IProps {
    comments: Array<IComments>
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


    let realComments = []
    for (const firstLevelComments of arrayOfChilds.entries()) {
        const comment = initialComments.get(firstLevelComments[0])
        if (comment)
            realComments.push(<Comment comment={comment}/>)
        for (const secondLevelComments of firstLevelComments[1]) {
            const innerComment = initialComments.get(secondLevelComments)
            if (innerComment)
                realComments.push(<ChildComment comment={innerComment}/>)
        }
    }


    return (<div className="lenta">
        {realComments}
    </div>)

}

// TODO возможно, тут будет проблема, что я тут использую тег, которого не было в оригинале