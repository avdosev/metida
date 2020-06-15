import {IPublicUser} from "../components/Organisms/IPrivateUser";
import {post} from "./router";
import {deleteUserFromLS, getUserFromLS} from "./localstorage";


function getCurrentUser(): IPublicUser | null {
    const userstring = getUserFromLS()
    if (!userstring) return null
    return JSON.parse(userstring)
}

async function isAuth() {
    const res = await post('/isAuth', {}, (res) => {return res})
    const body = await res.json()
    console.log(body)

    if (body.hasOwnProperty('error')) {
        deleteUserFromLS()
    }
    return body.hasOwnProperty('message')
}

export {getCurrentUser, isAuth}