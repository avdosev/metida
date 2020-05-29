import React from "react";
import {ChildComment, Comment} from "../../Molecules/Comment/Comment";
import {IComments} from "../../IComment";
import {loginQuery} from "../Form/FormHelper";


interface IProps {
    comments: Array<IComments>
}


export default function CommentLenta(props: IProps) {
    //console.log(props.comments)
    const initialComments: Map<number, IComments> = new Map()
    for (const comment of props.comments) {
        initialComments.set(comment.id, comment)
    }

    let arrayOfChilds: Array<Array<number>> = [[]]
    for (const baseComment of props.comments) {
        if (!baseComment.answeringId) {
            let arrayOfOneComment: number[] = [baseComment.id]
            for (const comment of props.comments) {
                if (comment.answeringId && arrayOfOneComment.includes(comment.answeringId)) {
                    arrayOfOneComment.push(comment.id)
                }
            }
            arrayOfChilds.push(arrayOfOneComment)
        }
    }

    console.log(arrayOfChilds)
    let realComments = []
    for (const firstLevelComments of arrayOfChilds) {
        for(const secondLevelComments of firstLevelComments) {
            // @ts-ignore
            realComments.push(<ChildComment comment={initialComments.get(secondLevelComments)} /> )
        }

    }


    return (<div className="lenta">
        {realComments}
    </div>)

}

// TODO возможно, тут будет проблема, что я тут использую тег, которого не было в оригинале