import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import md from '../../../services/markdown';
import { IPost } from '../../Pages/IPost';
import CommentIcon from '../../Images/CommentIcon/CommentIcon';

interface IProps {
    json: IPost;
}

export default function IndexShortPost(props: IProps) {
    const url = `/post/${props.json.id}`;

    return (
        <div key={props.json.id} className="post">
            <div className="title">
                <Link to={url}>
                    <h3 dangerouslySetInnerHTML={{ __html: props.json.header }} />
                </Link>
            </div>
            <div className="disclaimer" dangerouslySetInnerHTML={{ __html: md.render(props.json.disclaimer) }} />
            <div className="after_post">
                <Link to={url} className="after_post__button mainButton">
                    Читать дальше
                </Link>
                {/*{pathname: url, hash: "#comments", state: {toComments: true}}  */}
                <Link
                    to={{ pathname: url, hash: '#comments2', state: { toComments: true } }}
                    className="BtnToArticleComments"
                >
                    <CommentIcon />
                </Link>
            </div>
        </div>
    );
}
