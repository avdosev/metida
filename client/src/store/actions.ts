import {LOGOUT, SIGN_IN} from "../actions/events";
import {IPublicUser} from "../components/Organisms/IPrivateUser";
import {ChangeHeaderAction} from "./typings/actionType";

export function signIn(user: IPublicUser): ChangeHeaderAction {
    return {
        type: SIGN_IN,
        payload: user
    }
}

export function logout(): ChangeHeaderAction {
    return {
        type: LOGOUT,
        payload: null
    }
}
