import React from "react";

const isAuth = () => {
    return !!localStorage.getItem('user')
}

export {isAuth}