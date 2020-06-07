import {Field, IIState} from "../IAuth";
import {IPublicUser} from "../IPrivateUser";


interface IProps {
    onUserQuery: (isAuthed: boolean) => void
}

interface IState extends IIState {
    email: Field,
    password: Field,
    serverError: Field,
    user: IPublicUser

    [Symbol.iterator](): IterableIterator<Field> //если понадобится, то писать так

}

export type {IProps, IState}