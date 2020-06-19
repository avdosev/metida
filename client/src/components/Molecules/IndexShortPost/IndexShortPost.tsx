import {Link, Redirect} from "react-router-dom";
import React from "react";
import md from "../../../services/markdown"
import {IPost} from "../../Pages/IPost";

interface IProps {
    json: IPost
}

function CommentIcon() {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 15 14" className="after_post_icon">
            <path d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"/>
    </svg>
       )
}


export function IndexShortPost(props: IProps) {
    const url = `/post/${props.json.id}`;

    return (<div key={props.json.id} className="post">
        <div className="title">
            <Link to={url}>
                <h3 dangerouslySetInnerHTML={{__html: props.json.header}}/>
            </Link>
        </div>
        <div className="disclaimer" dangerouslySetInnerHTML={
            {__html: md.render(props.json.disclaimer)}}>
        </div>
        <div className="after_post">
            <Link to={url} className="after_post__button mainButton">Читать дальше</Link>
            {/*{pathname: url, hash: "#comments", state: {toComments: true}}  */}
            <Link to={{pathname: url, hash: "#comments2", state: {toComments: true}} } className="BtnToArticleComments">
                <CommentIcon />
            </Link>
        </div>
    </div>);
}