import {IUser} from "../components/Organisms/IUser";
import {post} from "./router";
import * as ls from "./localstorage"

function getCurrentUser(): IUser {
    const userstring = localStorage.getItem(ls.user)
    if (!userstring) throw new Error("User is not authed")
    return JSON.parse(userstring)
}

async function isAuth() {
    const res = await post('/isAuth', {}, (res) => {return res})
    if (res.status !== 200 && res.status !== 500) { // если сервер ответил что-то негативное, и не упал во время этого, то будем считать, что юзер не авторизован
        localStorage.removeItem(ls.user)
    }
    return res.status === 200
}

export {getCurrentUser, isAuth}