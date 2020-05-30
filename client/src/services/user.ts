import {IPrivateUser, IPublicUser} from "../components/Organisms/IPrivateUser";
import {post} from "./router";
import * as ls from "./localstorage"

function getCurrentUserUnsafe(): IPrivateUser {
    const userstring = localStorage.getItem(ls.user)
    if (!userstring) throw new Error("User is not authed")
    return JSON.parse(userstring)
}

function getCurrentUser(): IPublicUser {
    const userstring = localStorage.getItem(ls.user)
    if (!userstring) throw new Error("User is not authed")
    const userinfo: IPrivateUser = JSON.parse(userstring)
    const publicUser: IPublicUser = {
        ...userinfo
    }
    console.log(publicUser)
    return publicUser
}

async function isAuth() {
    const res = await post('/isAuth', {}, (res) => {return res})
    if (res.status !== 200 && res.status !== 500) { // если сервер ответил что-то негативное, и не упал во время этого, то будем считать, что юзер не авторизован
        localStorage.removeItem(ls.user)
    }
    return res.status === 200
}

export {getCurrentUser, isAuth}