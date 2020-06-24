import { get, post } from '../../../services/router';
import { IPublicUser } from '../../Organisms/IPrivateUser';
import { set as setls } from '../../../services/localstorage';
import { userFieldName } from '../../../config/localstorage';
import { Valid } from '../../Organisms/IAuth';
import { getCurrentUser } from '../../../services/user';
import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../../config/routes';
import React from 'react';
import { LANDING } from '../../../config/routes';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;
import { curry } from '@typed/curry';

interface IPush {
    [name: string]: string;
}

export const loginQuery = async (serverRoute: string, allFields: IPush) => {
    const carriedLS = curry(setls);
    const setUser = carriedLS(userFieldName);

    const response = await post(serverRoute, allFields, (res) => res);
    console.log(response);
    if (response.ok) {
        const userinfo = await response.json();
        setUser(JSON.stringify(userinfo));

        console.log(userinfo);
        return '';
    } else {
        const error = await response.text();
        console.error(error);
        return error;
    }
};

export const postLogin = async (signIn: (user: any) => any, error: any) => {
    if (error) {
        if (error.match('Cannot POST')) {
            console.warn('Сервер не отвечает');
            error = 'Сервер не отвечает, попробуйте позже.';
        }
        return { serverError: { value: error, valid: Valid.Invalid } };
    } else {
        const user = getCurrentUser();
        if (!user) throw new Error('После входа, нам не вернулся пользователь, это ужасно');

        signIn(user);
        return { referrer: <Redirect to={ROUTES.LANDING} /> };
    }
};
