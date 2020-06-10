import React from "react";
import {Link} from "react-router-dom";
import "./Burger.css"

function BurgerImage(props: { toggleMethod: (event: any) => void }) {
    return (<img className="icon" id="burger" alt="burger menu button" onClick={props.toggleMethod}
                 src='/img/ui_icon/mobile_menu.png'/>)
}

export default function Burger(props: { authorised: boolean }) {
    function toggleSubmenu(event: any) {
        const burger = document.getElementsByClassName('submenu')[0]

        if (event.target.id === "burger") {
            if (burger.id === "submenu") {
                burger.id = "submenu__active";
            } else {
                burger.id = "submenu";
            }
        } else {
            burger.id = "submenu";
        }
    }

    let buttons: JSX.Element
    if (props.authorised) {
        buttons =
            <>
                <li><Link className="BlackButton" id="createArticle" to="/createArticle">Написать</Link></li>
                <li><Link className="BlackButton" id="home" to="/home">Профиль</Link></li>
                <li><Link className="GreyButton" id="logout" to="/logout">Выйти</Link></li>
            </>
    // мне кажется, выйти не должна быть ссылкой, мы же не рендерим что-то

    } else {
        buttons =
            <>
                <li><Link className="GreyButton" id="signIn" to="/sign_In">Войти</Link></li>
                <li><Link className="BlackButton" id="register" to="/register">Регистрация</Link></li>
            </>
    }


    const burger = <nav>
        <ul className="topmenu">
            <li>
                <BurgerImage toggleMethod={toggleSubmenu}/>
                <ul className="submenu" id="submenu" onClick={toggleSubmenu}>
                    {buttons}
                </ul>
            </li>
        </ul>
    </nav>


    return (burger)
}