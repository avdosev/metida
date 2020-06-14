import {IPublicUser, UserInfo} from "../components/Organisms/IPrivateUser";

export const userFieldName = 'user' // объект в локал сторедже


export function writeUserInLS(user: UserInfo) {
    localStorage.setItem(userFieldName, JSON.stringify(user))
}

export function deleteUserFromLS() {
    localStorage.removeItem(userFieldName);
}

export function getUserFromLS() {
    return localStorage.getItem(userFieldName)
}