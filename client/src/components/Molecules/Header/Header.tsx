import React, {FunctionComponent, useEffect, useState} from "react";
import "./header.css"
import "../../colors.css" //TODO какого черта импорт происходит и отсюда и из css
import {
    Link
} from "react-router-dom";
import Burger from "../Burger/Burger";
import {isAuth} from "../../../services/user";

const Header:FunctionComponent<{}> = () => {
    const [authorised, setAuthorised] = useState(false)

    useEffect( () => {
        const checkAuth = async () => {
            const auth = await isAuth()
            setAuthorised(auth)
        }
        checkAuth() // не смотря на предупреждение, все работает корректно
    })


    return (
        <header className="header">
            <div className="header_inner flex space_between_inner">
                <div className="logo">
                    <Link to="/">
                        <img className="logoImg" src={process.env.PUBLIC_URL + '/img/logo_svg.svg'} alt="Metida"/>
                    </Link>
                </div>
                <div className="regSection">
                    <Burger authorised={authorised} />
                </div>
            </div>
            <hr/>
        </header>)
}


export default Header