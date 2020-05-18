import React from "react";
import "./header.css"
import "../../colors.css" //TODO какого черта импорт происходит и отсюда и из css
import {
    Link
} from "react-router-dom";

//{target: {id: string}}
export default function Header() {
    function toggleSubmenu(event: any) {
        const burger = document.getElementsByClassName('submenu')[0]

        if (event.target.id === "burger")  {
            if (burger.id === "submenu")  {
                burger.id = "submenu__active";
            }
            else {
                burger.id = "submenu";
            }
        }
        else  {
            burger.id = "submenu";
        }
    }

    return (
        <header className="header">
            <div className="header_inner flex space_between_inner">
                <div className="logo">
                    <Link to="/">
                        <img className="logoImg" src={process.env.PUBLIC_URL + '/img/logo_svg.svg'} alt="Metida"/>
                    </Link>
                </div>
                <div className="regSection">
                    <nav>
                        <ul className="topmenu">
                            <li>
                                <img className="icon" id="burger" alt="burger menu button" onClick={toggleSubmenu} src={process.env.PUBLIC_URL + '/img/ui_icon/mobile_menu.png'} />
                                <ul className="submenu" id="submenu" onClick={toggleSubmenu}>
                                    <li><Link className="GreyButton" id="signIn" to="/sign_In">Войти</Link></li>
                                    <li><Link className="BlackButton" id="register" to="/register">Регистрация</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <hr/>
        </header>)
}

