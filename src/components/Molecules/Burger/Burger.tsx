import React from "react";
import {Link} from "react-router-dom";
import "./Burger.css"

function BurgerImage() {
    return <summary className="not_details_marker">
        <img className="icon" id="burger" src={process.env.PUBLIC_URL + '/img/ui_icon/mobile_menu.png'}
             alt="burger menu button"/>
    </summary>
}

export default function Burger(props: { authorised: boolean }) {


    const authorised = <details className="menu">
        <BurgerImage/>
        <div className="dropdown-menu">
            <li><b className="dropdown_item">not signed </b></li>
            <hr/>
            <li><a className="dropdown_item" href="/git/undefined">Your profile</a></li>
            <hr/>
            <li>
                <li>
                    <form action="/api/logout" method="post">
                        <button className="dropdown_item" type="submit">Выйти</button>
                    </form>
                </li>
            </li>
        </div>
    </details>
    const notAuthorised = <details className="menu">
        <BurgerImage/>
        <div className="dropdown-menu">
            <li><Link className="dropdown_item GreyButton" to="/sign_In">Войти</Link></li>
            <hr/>
            <li><Link className="dropdown_item BlackButton" to="/register">Регистрация</Link></li>
        </div>
    </details>


    return (props.authorised ? authorised : notAuthorised)
}