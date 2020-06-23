import React from "react";
import ThemeChanger from "../../Atoms/ThemeChanger/ThemeChanger";
import style from "./Footer.scss"

export default function Footer() {
    return(<footer className={style.footer}> Все права за K.Corp. <ThemeChanger /> </footer>)
}