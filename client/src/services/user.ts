import {IPublicUser} from "../components/Organisms/IPrivateUser";
import {post} from "./router";
import {remove as removeLS, get as getLS} from "./localstorage";
import {userFieldName} from "../config/localstorage";


function getCurrentUser(): IPublicUser | null {
    const userstring = getLS(userFieldName)
    if (!userstring) return null
    console.log(userstring)
    return JSON.parse(userstring)
}

async function isAuth() {
    const res = await post('/isAuth', {}, (res) => {return res})
    const body = await res.json()
    console.log(body)

    if (body.hasOwnProperty('error')) {
        removeLS(userFieldName)
    }
    return body.hasOwnProperty('message')
}

export {getCurrentUser, isAuth}