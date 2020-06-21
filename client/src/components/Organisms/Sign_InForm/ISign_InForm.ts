import {IIState} from "../IAuth";
import {IPublicUser} from "../IPrivateUser";


interface IProps {
    // user: null | IPublicUser
    // signIn: () => any // какую-то функцию
    // logout: () => any
    setAuth: any
}

interface IState extends IIState {
    email: Field,
    password: Field,
    serverError: Field,
    [field: string]: any

    [Symbol.iterator](): IterableIterator<Field> //если понадобится, то писать так

}

export type {IProps, IState}