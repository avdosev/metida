import {IPrivateUser, IPublicUser} from "../components/Organisms/IPrivateUser";
import {post} from "./router";
import {deleteUserFromLS, getUserFromLS} from "./localstorage";


function getCurrentUser(): IPublicUser | null {
    const userstring = getUserFromLS()
    console.log(userstring)
    if (!userstring) return null
    const userinfo: IPublicUser = <IPublicUser>JSON.parse(userstring)
    console.log(userinfo)
    return userinfo
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