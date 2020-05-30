import {Link, Redirect} from "react-router-dom";
import React from "react";
import {md} from "../../../services/markdown"
import {IPost} from "../../Pages/Profile/IPost";

interface IProps {
    json: IPost
}



export function Post(props: IProps) {
    const url = `/post/${props.json.id}`;

    return (<div key={props.json.id} className="post">
        <div className="title">
            <Link to={url}>
                <h3 dangerouslySetInnerHTML={{__html: md.render(props.json.header)}}/>
            </Link>
        </div>
        <div className="disclaimer">
            <p dangerouslySetInnerHTML={{__html: md.render(props.json.disclaimer)}}/>
        </div>
        <div className="after_post">
            <Link to={url} className="BtnToArticle">Читать дальше</Link>
            {/*, hash: "#comments"*/}
            <Link to={{pathname: url, state: {toComments: true}}} className="BtnToArticleComments">
                <img className="after_post_icon" src={process.env.PUBLIC_URL + "/img/ui_icon/comment.svg"}
                     alt="Смотреть комментарии"/>
            </Link>
        </div>
    </div>);
}