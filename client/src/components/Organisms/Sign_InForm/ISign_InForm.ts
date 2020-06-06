import {Field, IIState} from "../IAuth";


interface IProps {
}

interface IState extends IIState {
    email: Field,
    password: Field,
    serverError: Field,

    [Symbol.iterator](): IterableIterator<Field> //если понадобится, то писать так

}

export type {IProps, IState}