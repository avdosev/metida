import React, { useState, useEffect } from 'react'
import {theme} from "../../../config/localstorage";
import logger from "redux-logger";

enum Themes {
    dark="dark",
    light="light"
}

const ThemeChanger = () => {
    const [themeState, setThemeState] = useState(Themes.light);

    const handleChange = () => {
        setThemeState(themeState === Themes.light ? Themes.dark : Themes.light);

        if (themeState === Themes.light) {
            localStorage.setItem(theme, Themes.dark);
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem(theme, Themes.light);
            document.body.classList.remove('dark-mode');
        }
    }
    useEffect(() => {
        const getTheme = localStorage.getItem(theme);
        if (getTheme === Themes.dark) {
            document.body.classList.add('dark-mode');
        }
        console.log("Логгирую,", getTheme)
    })
    console.log(themeState)
    return (
        <div>
            <button className="mainButton" onClick={handleChange}>{themeState === Themes.dark ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
    )
}

export default ThemeChanger;