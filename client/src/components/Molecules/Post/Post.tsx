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
                <h3 dangerouslySetInnerHTML={{__html: props.json.header}}/>
            </Link>
        </div>
        <div className="disclaimer" dangerouslySetInnerHTML={
            {__html: md.render(props.json.disclaimer)}}>
        </div>
    </div>);
}