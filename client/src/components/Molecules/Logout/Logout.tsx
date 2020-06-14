import React from "react";
import { Redirect } from 'react-router-dom';
import * as ROUTES from "../../../config/routes"
import {deleteUserFromLS} from "../../../services/localstorage";

export default function Logout(props: any) {
    deleteUserFromLS()
    props.setAuth(null)

    return <Redirect to={ROUTES.LANDING}/>
}