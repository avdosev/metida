import { serverUri } from "./config";
import {IUser} from "./Organisms/IUser";


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

async function isAuth() {
    const res = await post('/isAuth', {}, (res) => {return res})
    return res.status === 200 //пока не знаю что там пришло, оставлю так
}

function getCurrentUser(): IUser {
    const userstring = localStorage.getItem('user')
    if (!userstring) throw new Error("User is not authed")
    return JSON.parse(userstring)
}

function authHeader() {
    const authInfo = localStorage.getItem('user')
    //console.log(authInfo)
    if (authInfo) {
        const user: IUser = JSON.parse(authInfo);
        if (user && user.accessToken) {
            return { 'x-access-token': user.accessToken };
        } else {

        }
    }

}

export {get, post, isAuth, getCurrentUser}