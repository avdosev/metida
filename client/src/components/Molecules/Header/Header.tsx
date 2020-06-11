import React, {FunctionComponent, useEffect, useState} from "react";
import "./header.scss"
import "../../styles/flex.scss"
import "../../styles/main.scss"
import {
    Link
} from "react-router-dom";
import Burger from "../Burger/Burger";
import {isAuth} from "../../../services/user";
import {initialUser, IPublicUser} from "../../Organisms/IPrivateUser";

interface IHeader {
    user: IPublicUser | undefined
}


const Header: () => JSX.Element = () => {
    const [authorised, setAuthorised] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuth()
            setAuthorised(auth)
        }
        checkAuth() // не смотря на предупреждение, все работает корректно
    })

    const isDarkSystemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    //const logoLink = isDarkSystemTheme ? "/img/myCustomSVGWhite.svg" : "/img/myCustomSVG.svg"
    console.log(isDarkSystemTheme)

        return (
                <header className="header">
                    <div className="header_inner flex alignCenter space_between_inner">
                        <div className="logo">
                            <Link to="/">
                                <img className="logo__image" src="/img/changableColorLogo.svg" alt="Metida"/>
                                <div className="logo__title">
                                    <div className="logo__underline"/>
                                </div>
                            </Link>
                        </div>

                        <div className="regSection">
                            <Burger authorised={authorised}/>
                        </div>

                    </div>
                    <hr/>
                </header>
      )
}


export default Header