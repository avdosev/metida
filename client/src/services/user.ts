import {IUser} from "../components/Organisms/IUser";
import {post} from "./router";

function getCurrentUser(): IUser {
    const userstring = localStorage.getItem('user')
    if (!userstring) throw new Error("User is not authed")
    return JSON.parse(userstring)
}

async function isAuth() {
    const res = await post('/isAuth', {}, (res) => {return res})
    return res.status === 200 //пока не знаю что там пришло, оставлю так
}

export {getCurrentUser, isAuth}