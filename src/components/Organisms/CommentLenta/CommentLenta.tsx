import React from "react";
import {Comment} from "../../Molecules/Comment/Comment";
import {IComments} from "../../IComment";



interface IProps {
    comments: Array<IComments>
}

export default function CommentLenta(props: IProps) {
    return (<div className="lenta">
        {props.comments.map(comment => (
            <>
                <Comment key={comment.id} comment={comment}/>
                {comment.child && comment.child.length ? <CommentLenta comments={comment.child} /> : null}
            </>
        ))}

    </div>)

}

// TODO возможно, тут будет проблема, что я тут использую тег, которого не было в оригинале