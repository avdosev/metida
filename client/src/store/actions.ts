import {ActionType} from "./actionType";
import {LOGOUT, SIGN_IN} from "../actions/events";
import {IPublicUser} from "../components/Organisms/IPrivateUser";


export const setAuth = (user: IPublicUser | null) => ({
    type: SIGN_IN,
    payload: user
})