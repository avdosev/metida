import {Validators} from "../IValidators";
import {IIState, Field} from "../IAuth";


interface IProps {

}


interface IState extends IIState {
    validators?: Validators;
    repassword: Field,
    login: Field,
    email: Field,
    password: Field,
}

export type {IState, IProps}