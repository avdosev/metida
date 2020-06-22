import React from "react";
import {initialAuthor, initialUser, IPublicUser, UserInfo} from "../../Organisms/IPrivateUser";
import {get} from "../../../services/router";
import {getCurrentUser} from "../../../services/user"
import {IndexShortPost} from "../../Atoms/IndexShortPost/IndexShortPost";
import Feed from "../../Organisms/Feed/Feed";
import "../../styles/lenta.scss"

interface IState {
    user: UserInfo
}

interface IProps {
    isHome?: boolean
}


export function getUsername() {
    const url = window.location.href.split("/")
    return url[url.length - 1]
}

export default class Profile extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {user: initialAuthor}
    }

    async componentDidMount() {
        let username: string
        if (!this.props.isHome) {
            username = getUsername()
        }
        else {
            const user = getCurrentUser()
            if (user) username = user.username
            else username = "Произошла непредвиденная ошибка"
        }
        console.log(username)
        const userInfo: UserInfo = await get(`/api/author/${username}`)
        this.setState({user: userInfo})


    }


    render() {
        let articles: JSX.Element[] = []
        if (this.state.user.articles) {
            for (const article of this.state.user.articles) {
                articles.push(<IndexShortPost key={article.id} json={article} />)
            }
            articles = articles.reverse() // потому что они должны быть отсортированы от самой новой
        }

        return (
            <div className="layout_body">
                <main className="content">
                    <h1>{this.props.isHome ? "Мой профиль" : "Профиль"}</h1>
                    <div className="profile">
                        <div className="left">
                            <img className="avatar"
                                src={this.state.user.avatar ?? "/img/default/avatar_small.png"}
                                alt="avatar"/>
                        </div>
                        <div className="right">
                            <h3>{this.state.user.username}</h3>
                            <p className="about">Обо мне:
                                {this.state.user.about ?? "Ты ничего не узнаешь"}
                            </p>
                        </div>
                    </div>
                    Статейки:
                    <Feed>
                        {articles}
                    </Feed>
                </main>
            </div>)
    }
}

