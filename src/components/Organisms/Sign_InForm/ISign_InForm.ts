import {Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";


interface FieldDescription {
    regexp: string,
    EventError: string,
    error_str: string
}

interface AbsFD {
    [fieldName: string]: FieldDescription //это значит, любое количество стринговых полей
}

interface IProps {
}

interface IState extends IIState {
    validators?: Validators;
    fieldDescription: AbsFD

}

export type {IProps, IState}