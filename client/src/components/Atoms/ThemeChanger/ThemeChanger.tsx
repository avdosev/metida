import React, { useState, useEffect } from 'react';
import { theme } from '../../../config/localstorage';
import { get } from '../../../services/localstorage';
import { curry } from '@typed/curry';

const enum Themes {
    dark = 'dark',
    light = 'light',
}

const ThemeChanger = () => {
    const curryGet = curry(get);
    const themeGetter = curryGet(theme);

    const [themeState, setThemeState] = useState(themeGetter);

    const handleChange = () => {
        setThemeState(themeState === Themes.light ? Themes.dark : Themes.light);

        if (themeState === Themes.light) {
            localStorage.setItem(theme, Themes.dark);
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem(theme, Themes.light);
            document.body.classList.remove('dark-mode');
        }
    };
    useEffect(() => {
        const getTheme = themeGetter;
        if (getTheme === Themes.dark) {
            document.body.classList.add('dark-mode');
        }
        console.log('Логгирую,', getTheme);
    });
    console.log(themeState);
    return (
        <div>
            <button className="mainButton" onClick={handleChange}>
                {themeState === Themes.dark ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
};

export default ThemeChanger;
