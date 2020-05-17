import React from "react";
import "../../input.css"
import "../../main.css"
import "./post.css"
import "../../comments.css"


interface IProps {

}

interface IState {

}


export default class Post extends React.Component<IProps, IState>{
    render() {
        return (
            <div className="layout_body">
                <div className="content">
                    <button className="deleteAricleLink">Удалить статью</button>
                    <button className="updateAricleLink">Редактировать статью</button>
                    <article className="post_text">
                        <h1></h1>
                    </article>
                    <div className="comments_lenta onfullwidth" id="comments">
                        <h3>Комментарии:</h3>
                    </div>
                    <div className="new_comment_block">
                        <p>Зарегистрируйся, если хочешь оставить коммент</p>
                    </div>
                </div>
            </div>
        );
    }
}

