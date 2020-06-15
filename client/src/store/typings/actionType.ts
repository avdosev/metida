import {LOGOUT, SIGN_IN} from "../../actions/events";
import {IPublicUser} from "../../components/Organisms/IPrivateUser";


interface IStore extends ChangeHeader{

}

interface ActionType {
    type: string
    payload: any
}



interface ChangeHeader {
    user: IPublicUser | null

}

interface SignInAction extends ActionType {
    type: typeof SIGN_IN
    payload: IPublicUser
}

interface LogoutAction extends ActionType {
    type: typeof LOGOUT
    payload: null
}

export type {ActionType, IStore, ChangeHeader }
export type ChangeHeaderAction = SignInAction | LogoutAction