import React from 'react';
import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../../config/routes';
import { remove } from '../../../services/localstorage';
import { ChangeHeaderAction } from '../../../store/typings/actionType';
import { ChangeHeaderInterface } from '../../../containers/ChangeHeaderEvent/dispatcher';
import { userFieldName } from '../../../config/localstorage';

export default function Logout(props: ChangeHeaderInterface) {
    remove(userFieldName);
    props.logout();

    return <Redirect to={ROUTES.LANDING} />;
}
