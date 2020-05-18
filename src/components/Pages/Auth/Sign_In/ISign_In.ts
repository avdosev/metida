import {Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";

interface IProps {

}

interface IState extends IIState {
    validators?: Validators;
    email: Field,
    password: Field
}

export type {IState, IProps}