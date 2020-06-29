import React, { FunctionComponent, useEffect, useState } from 'react';
import './header.scss';
import 'Styles/flex.scss';
import 'Styles/main.scss';
import { initialUser, IPublicUser } from '../../Organisms/IPrivateUser';
import { MainLogo, Burger } from 'Components';

interface IHeader {
    user: IPublicUser | null;
}

const Header: (props: any) => any = (props: any) => {
    return (
        <header className="header">
            <div className="header_inner flex alignCenter space_between_inner">
                <MainLogo />

                <div className="regSection">
                    <Burger authorised={props.user} />
                </div>
            </div>
            <hr />
        </header>
    );
};

export { Header };
