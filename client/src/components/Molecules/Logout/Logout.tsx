import React from "react";
import { Redirect } from 'react-router-dom';
import * as ROUTES from "../../../config/routes"

export default function Logout(props: any) {
    localStorage.removeItem("user");
    props.setAuth(null)

    return <Redirect to={ROUTES.LANDING}/>
}