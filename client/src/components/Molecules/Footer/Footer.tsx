import React from "react";
import ThemeChanger from "../../Atoms/ThemeChanger/ThemeChanger";
import style from "./Footer.scss"

export default function Footer() {
    return (
        <div className="prefooter">
            <hr />
            <footer className={style.footer}>

                Все права за K.Corp. <ThemeChanger/>
            </footer>
        </div>
    )
}