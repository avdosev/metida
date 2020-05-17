import React from "react";
import "./header.css"
import "../colors.css" //TODO какого черта импорт происходит и отсюда и из css

//{target: {id: string}}
export default function Header() {
    function toggleSubmenu(event: any) {
        console.log(typeof event)
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
                    <a href="/">
                        <img className="logoImg" src={process.env.PUBLIC_URL + '/img/logo_svg.svg'} alt="Metida"/>
                    </a>
                </div>
                <div className="regSection">
                    <nav>
                        <ul className="topmenu">
                            <li><img className="icon" id="burger" onClick={toggleSubmenu} src={process.env.PUBLIC_URL + '/img/ui_icon/mobile_menu.png'} />
                                <ul className="submenu" id="submenu" onClick={toggleSubmenu}>
                                    <li><a className="GreyButton" id="signIn" href="/sign_In">Войти</a></li>
                                    <li><a className="BlackButton" id="register" href="/register">Регистрация</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <hr/>
        </header>)
}

