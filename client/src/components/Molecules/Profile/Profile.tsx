import React from "react";
import {initialUser, UserInfo} from "../../Organisms/IUser";
import {get, getCurrentUser} from "../../Router";
import {Post} from "../Post/Post";

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
        this.state = {user: initialUser}
    }

    async componentDidMount() {
        let username: string
        if (!this.props.isHome) {
            username = getUsername()
        }
        else {
            username = getCurrentUser().username
        }
        console.log(username)
        const userInfo: UserInfo = await get(`/api/author/${username}`)
        this.setState({user: userInfo})

    }


    render() {
        let articles = []
        for (const article of this.state.user.articles) {
            articles.push(<Post json={article} />)
        }
        articles = articles.reverse()

        console.log(this.state.user.articles)
        return (
            <div className="layout_body">
                <h1>{this.props.isHome ? "Мой профиль" : "Профиль"}</h1>
                <div className="profile">
                    <div className="left">
                        <img className="avatar"
                             src={this.state.user.avatar ? this.state.user.avatar : process.env.PUBLIC_URL + "/img/default/avatar_small.png"}
                             alt="avatar"/>
                    </div>
                    <div className="right">
                        <h3>{this.state.user.username}</h3>
                        <p className="about">Обо мне:
                            {this.state.user.about ? this.state.user.about : "Ты ничего не узнаешь"}
                        </p>
                    </div>
                </div>
                Статейки:
                <div className="lenta">
                    {articles}
                </div>
            </div>)
    }
}

