import React from "react";
import {ChildComment, Comment} from "../../Molecules/Comment/Comment";
import {IComments} from "../../IComment";
import {Simulate} from "react-dom/test-utils";


interface IProps {
    comments: Array<IComments>
}


export default function CommentLenta(props: IProps) {
    //console.log(props.comments)
    const initialComments: Map<number, IComments> = new Map()
    for (const comment of props.comments) {
        if (!comment.answeringId) {
            initialComments.set(comment.id, comment)
        }
    }

    for (const comment of props.comments) {
        if (comment.answeringId) {
            let parent = initialComments.get(comment.answeringId)
            if (!parent) {
                parent = props.comments.find(com => com.id == comment.answeringId)
            }

            console.log(comment, parent)
            if (parent) {
                if (!parent.child) parent.child = []
                parent.child?.push(comment)
                initialComments.set(parent.id, parent)
            }
            else {
                console.warn(comment)
                console.warn(initialComments.keys())
                //console.warn(initialComments)
                throw new Error("соси")
            }
            //initialComments.push(<ChildComment comment={comment} />)
        }
    }

    console.log(initialComments)
    let realComments = []
    for (const comment of initialComments.values()) {
        realComments.push(<Comment comment={comment} />)
        // @ts-ignore
        if (comment.child) {
            for(const childComment of comment.child) {
                realComments.push(<ChildComment comment={childComment}/>)
            }
        }
    }
    return (<div className="lenta">

        {realComments}
    </div>)

}

// TODO возможно, тут будет проблема, что я тут использую тег, которого не было в оригинале