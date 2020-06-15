import React from "react";
import { Redirect } from 'react-router-dom';
import * as ROUTES from "../../../config/routes"
import {deleteUserFromLS} from "../../../services/localstorage";
import {ChangeHeaderAction} from "../../../store/typings/actionType";
import {ChangeHeaderInterface} from "../../../containers/ChangeHeaderEvent/dispatcher";

export default function Logout(props: ChangeHeaderInterface) {
    deleteUserFromLS()
    props.logout()

    return <Redirect to={ROUTES.LANDING}/>
}