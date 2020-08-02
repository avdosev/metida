import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import BurgerImage from '../../Images/BurgerImage/BurgerImage';
import { eqProps } from 'ramda';

function AuthorisedListButtons() {
    return (
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
}

function UnauthorizedListButtons() {
    return (
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

function ListMenuButtons(props: { authorised: boolean; active: boolean; onClick?: (event: any) => void; id: string }) {
    const submenuState = props.active ? 'submenu__active' : 'submenu__close';

    return (
        <ul className={`submenu ${submenuState}`} id={props.id} onClick={props.onClick}>
            {props.authorised ? <AuthorisedListButtons /> : <UnauthorizedListButtons />}
        </ul>
    );
}

function booleanNot(value: boolean, action: string) {
    switch (action) {
        case 'next':
            return !value;
        case 'close':
            return false;
        default:
            throw new Error('Action not supported');
    }
}

export default function Burger(props: { authorised: boolean }) {
    let [active, dispatchSubmenuState] = useReducer(booleanNot, false);

    const nextToggle = () => dispatchSubmenuState('next');
    const missToggle = () => dispatchSubmenuState('close');

    /**
     * Событие проходит вниз с элемента на который кликнули
     * Если текущий элемент - бургер то
     *   Меняем состояние нашего элемента
     *   Останавливаем проход события вниз к document
     * Иначе
     *   событие опускается до document
     *   Мы считаем что юзер тыкнул на что-то другое
     *   Из этого следует что менюшку можно закрыть
     */

    function toggleBurger(event: any) {
        if (event.currentTarget.id === 'burger') {
            nextToggle();
            event.preventDefault();
        } else {
            missToggle();
        }
    }

    useEffect(() => {
        const burger = document.getElementById('burger');
        const elements = [burger, document];
        elements.forEach((element) => element?.addEventListener('click', toggleBurger));
        return () => {
            elements.forEach((element) => element?.removeEventListener('click', toggleBurger));
        };
    });

    const burger = (
        <nav className="topmenu">
            <BurgerImage lineHeight={2} lineWidth={12} id="burger" />
            <ListMenuButtons authorised={props.authorised} active={active} id="submenu" />
        </nav>
    );

    return burger;
}
