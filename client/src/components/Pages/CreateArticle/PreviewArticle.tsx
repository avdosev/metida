import React from "react";

interface IProps {
    header: string,
    disclaimer: string,
    content: string
}

const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});


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

