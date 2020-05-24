import {Link} from "react-router-dom";
import React from "react";


export function Post(props) {
    const url = `/post/${props.json.id}`;

    const htmlPost =
        <div key={props.json.id} className="post">
            <div className="title">
                <Link to={url}>
                    <h3 dangerouslySetInnerHTML={{__html: props.json.header}} />
                </Link>
            </div>
            <div className="disclaimer">
                <p dangerouslySetInnerHTML={{__html: props.json.disclaimer}} />
            {/*    TODO так-то это хак, надо бы подумать над хорошим решением */}
            </div>
            <div className="after_post">
                <Link to={url} className="BtnToArticle">Читать дальше</Link>
                <Link to={url + "#comments"} className="BtnToArticleComments">
                    <img className="after_post_icon" src={process.env.PUBLIC_URL + "/img/ui_icon/comment.svg"} alt="after post icon"/>
                </Link>
            </div>
        </div>

    return htmlPost;
}