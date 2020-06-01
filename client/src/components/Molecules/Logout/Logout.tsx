import React from "react";
import { Redirect } from 'react-router-dom';
import * as ROUTES from "../../../config/routes"

export default function Logout() {
    localStorage.removeItem("user");

    return <Redirect to={ROUTES.LANDING}/>
}