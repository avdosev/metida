import React from "react";
import "./header.css"
import "../../colors.css" //TODO какого черта импорт происходит и отсюда и из css
import {
    Link
} from "react-router-dom";
import Burger from "../Burger/Burger";

//{target: {id: string}}
export default function Header() {
    return (
        <header className="header">
            <div className="header_inner flex space_between_inner">
                <div className="logo">
                    <Link to="/">
                        <img className="logoImg" src={process.env.PUBLIC_URL + '/img/logo_svg.svg'} alt="Metida"/>
                    </Link>
                </div>
                <div className="regSection">
                    <Burger authorised={false} />
                </div>
            </div>
            <hr/>
        </header>)
}

