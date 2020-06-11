import {ActionType} from "./actionType";
import {LOGOUT, SIGN_IN} from "../actions/events";
import {IPublicUser} from "../components/Organisms/IPrivateUser";

export function signIn(user: IPublicUser): ActionType {
    return {
        type: SIGN_IN,
        payload: user
    }
}

export function logout(): ActionType {
    return {
        type: LOGOUT,
        payload: null
    }
}