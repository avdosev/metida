import React from "react";
import {md} from "../../../services/markdown"

interface IProps {
    header: string,
    disclaimer: string,
    content: string
}



export default function PreviewArticle(props: IProps) {
    const textStr = md.render(props.content)
    const disclaimerStr = md.render(props.disclaimer)

    return (<>
            <h1 dangerouslySetInnerHTML={{__html: props.header}}/>
            <div dangerouslySetInnerHTML={{__html: disclaimerStr}} />
            <div dangerouslySetInnerHTML={{__html: textStr}} />
        </>
    )
}

