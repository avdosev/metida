import { Link } from 'react-router-dom';
import React from 'react';

export default function MainLogo() {
    return (
        <div className="logo">
            <Link to="/">
                <img className="logo__image" src="/img/header__logo.svg" alt="Metida" />
                <div className="logo__title">
                    <div className="logo__underline" />
                </div>
            </Link>
        </div>
    );
}
