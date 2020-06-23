import {ValidatorState, Field} from "../IValidators";
import {IPublicUser} from "../IPrivateUser";


interface IProps {
    // user: null | IPublicUser
    // signIn: () => any // какую-то функцию
    // logout: () => any
    setAuth: any
}

interface IState {
    email: Field,
    password: Field,
    serverError: Field,
    referrer: JSX.Element
}

export type {IProps, IState}