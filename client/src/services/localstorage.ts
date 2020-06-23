import {IPublicUser, UserInfo} from "../components/Organisms/IPrivateUser";
import {userFieldName} from "../config/localstorage";

export function writeUserInLS(user: UserInfo) {
    localStorage.setItem(userFieldName, JSON.stringify(user))
}

export function deleteUserFromLS() {
    localStorage.removeItem(userFieldName);
}

export function getUserFromLS() {
    return localStorage.getItem(userFieldName)
}