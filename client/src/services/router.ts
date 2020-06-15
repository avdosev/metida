import { serverUri } from "../config/config";
import {IPrivateUser} from "../components/Organisms/IPrivateUser";
import * as ls from "./localstorage"
import {getUserFromLS} from "./localstorage";

async function query(method: string, url: string, data: any=null, callback?: {(response: any): void } ) {
    let response;
    if (method === "post") {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            },
            body: JSON.stringify({
                ...data
            })
        }
        response = await fetch(serverUri + url, options);
    }
    else {
        const options = {
            method: method,
            headers: {
                ...authHeader()
            }
        }
        response = await fetch(serverUri + url, options);
    }

    if (!!callback) { // тут тип ты можешь сделать свой анализ запроса
        return callback(response)
    }
    else {
        const { status } = response;
        if (status === 404) { // TODO а также всем другим неудачным статусам
            const { statusText } = response;
            console.log('Статус', statusText);
        }
        return response.json();
    }
}

async function get(url: string) {
    return await query("get", url)
}

async function post(url: string, data: any, callback?: {(response: any): void }) {
    return  await query("post", url, data, callback);
}

async function deleteMethod(url: string, data: any, callback?: {(response: any): void }) {
    return await query("delete", url, data, callback);
}

function authHeader() {
    const authInfo = getUserFromLS()
    //console.log(authInfo)
    if (authInfo) {
        const user: IPrivateUser = JSON.parse(authInfo);
        if (user && user.accessToken) {
            return { 'x-access-token': user.accessToken };
        } else {

        }
    }

}

export {get, post}