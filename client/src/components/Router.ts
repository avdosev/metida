import { serverUri } from "./config";
import {IUser} from "./Organisms/IUser";


async function query(method: string, url: string, data: any=null, callback?: {(response: any): void } ) {
    authHeader()
    let response;
    if (method == "post") {
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
        if (status === 404) {
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

async function isAuth() {
    const res = await post('/isAuth', {})
    console.log(res)
    return res.statusCode == 200 //пока не знаю что там пришло, оставлю так

}

function authHeader() {
    const authInfo = localStorage.getItem('user')

    if (authInfo) {
        const user: IUser = JSON.parse(authInfo);
        if (user && user.accessToken) {
            return { 'x-access-token': user.accessToken };
        } else {

        }
    }

}

export {get, post, isAuth}