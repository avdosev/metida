import {IPrivateUser, IPublicUser} from "../components/Organisms/IPrivateUser";
import {post} from "./router";
import * as ls from "./localstorage"
import {logout} from "../../build/store/actions";


function getCurrentUser(): IPublicUser | null {
    const userstring = localStorage.getItem(ls.user)
    if (!userstring) return null
    const userinfo: IPrivateUser = JSON.parse(userstring)
    const publicUser: IPublicUser = {
        ...userinfo
    }
    console.log(publicUser)
    return publicUser
}

async function isAuth() {
    const res = await post('/isAuth', {}, (res) => {return res})
    const body = await res.json()
    console.log(body)

    if (body.hasOwnProperty('error')) {
        localStorage.removeItem(ls.user)
    }
    return body.hasOwnProperty('message')
}

export {getCurrentUser, isAuth}