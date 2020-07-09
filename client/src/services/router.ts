import { serverUri } from '../config/config';
import { IPrivateUser } from '../components/Organisms/IPrivateUser';
import * as ls from './localstorage';
import { userFieldName } from '../config/localstorage';
import { has } from './utils';

interface IData {
    [name: string]: string | number | undefined;
}

export type HTTP_method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';

async function query(method: HTTP_method, url: string, data?: IData, callback?: { (response: any): void }) {
    let response;
    if (serverUri === undefined) {
        throw new Error('Server URI is not defined');
    }

    const fullRouteUrl = serverUri + url;
    if (has(['post', 'put', 'patch'], method)) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
            body: JSON.stringify({
                ...data,
            }),
        };
        response = await fetch(fullRouteUrl, options);
    } else {
        const options = {
            method: method,
            headers: {
                ...authHeader(),
            },
        };
        response = await fetch(serverUri + url, options);
    }

    if (!!callback) {
        // тут тип ты можешь сделать свой анализ запроса
        return callback(response);
    } else {
        const { status } = response;
        if (status === 404) {
            // TODO а также всем другим неудачным статусам
            const { statusText } = response;
            console.log('Статус', statusText);
        }
        return response.json();
    }
}

type callback_t = { (response: any): any };

async function get(url: string, callback?: callback_t) {
    return await query('get', url);
}

async function post(url: string, data: IData, callback?: callback_t) {
    return await query('post', url, data, callback);
}

async function delete_(url: string, data: IData, callback?: callback_t) {
    return await query('delete', url, data, callback);
}

async function put(url: string, data: IData, callback?: callback_t) {
    return await query('put', url, data, callback);
}

function authHeader() {
    const authInfo = ls.get(userFieldName);
    //console.log(authInfo)
    if (authInfo) {
        const user: IPrivateUser = JSON.parse(authInfo);
        if (user && user.accessToken) {
            return { 'x-access-token': user.accessToken };
        } else {
        }
    }
}

export { get, post, query };
