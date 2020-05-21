import React from "react";

interface IState {

}

interface IProps {
    username: string
}

export default class Profile extends React.Component<IProps, IState> {
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

