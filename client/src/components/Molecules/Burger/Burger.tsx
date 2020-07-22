import React from 'react';
import { Link } from 'react-router-dom';
import BurgerImage from '../../Images/BurgerImage/BurgerImage';

export default function Burger(props: { authorised: boolean }) {
    function toggleSubmenu(event: any) {
        const burger = document.getElementById('submenu');
        if (burger === null) return;

        if (event.target.id === 'burger') {
            burger.classList.toggle('submenu__active');
            burger.classList.toggle('submenu__close');
        } else {
            burger.classList.replace('submenu__active', 'submenu__close');
        }
    }

    let buttons: JSX.Element;
    if (props.authorised) {
        buttons = (
            <>
                <li>
                    <Link className="BlackButton" id="createArticle" to="/createArticle">
                        Написать
                    </Link>
                </li>
                <li>
                    <Link className="BlackButton" id="home" to="/home">
                        Профиль
                    </Link>
                </li>
                <li>
                    <Link className="GreyButton" id="logout" to="/logout">
                        Выйти
                    </Link>
                </li>
            </>
        );
    } else {
        buttons = (
            <>
                <li>
                    <Link className="GreyButton" id="signIn" to="/sign_In">
                        Войти
                    </Link>
                </li>
                <li>
                    <Link className="BlackButton" id="register" to="/register">
                        Регистрация
                    </Link>
                </li>
            </>
        );
    }

    const burger = (
        <nav>
            <ul className="topmenu">
                <li>
                    <BurgerImage toggleMethod={toggleSubmenu} lineHeight={2} lineWidth={12} id="burger" />
                    <ul className="submenu submenu__close" id="submenu" onClick={toggleSubmenu}>
                        {buttons}
                    </ul>
                </li>
            </ul>
        </nav>
    );

    return burger;
}
