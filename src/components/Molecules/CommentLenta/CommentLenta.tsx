import React from "react";


export default function CommentLenta(props: any) {
    return (<div className="lenta">
        {props.children}
    </div>)

}

// TODO возможно, тут будет проблема, что я тут использую тег, которого не было в оригинале