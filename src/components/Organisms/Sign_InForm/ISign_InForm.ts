import {Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";


interface IProps {
}

interface IState extends IIState {
    email: Field,
    password: Field
}

export type {IProps, IState}