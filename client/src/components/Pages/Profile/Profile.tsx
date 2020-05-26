import React from "react";

interface IState {

}

interface IProps {
    username: string
}

export function getUsername() {
    const url = window.location.href.split("/")
    return  url[url.length-1]
}

export default class Profile extends React.Component<IProps, IState> {
    getArticles() {
        fetch(`/api/author/${getUsername()}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(value => {
            console.log(value)
            return value.json()
        }).then((json => {
            const insertElem = document.querySelector('.lenta')
            const articles = json.articles;
            for (let i = 0; i < articles.length; i++) {
                if (articles[i] == undefined) {
                    console.error("Все");
                    break
                }
                //insertPostPreview(articles[i], insertElem);
            }
        })).catch(error => {
            console.error(error);
        })
    }


    render() {
        return (
            <div className="layout_body">
                <h1>Профиль</h1>
                <div className="profile">
                    <div className="left">
                        <img className="avatar" src={process.env.PUBLIC_URL + "/img/default/avatar_small.png"}/>
                    </div>
                    <div className="right">
                        <h3>{this.props.username}</h3>
                        <p className="about">Обо мне:
                            Ты ничего не узнаешь</p>
                    </div>
                </div>
                <div className="lenta"></div>
            </div>)
    }
}
