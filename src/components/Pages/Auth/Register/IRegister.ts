import {Validators} from "../IValidators";

interface IProps {

}

interface Field {
    value: string,
    valid: boolean
}

interface Fields {
    validators?: Validators;
    [name: string]: any;

}

interface IState extends Fields {
    validators?: Validators;
    repassword: Field,
    login: Field,
    email: Field,
    password: Field,
}

export type {IState, IProps}