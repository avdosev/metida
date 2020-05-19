import {Validators} from "../IValidators";

interface FieldDescription {
    regexp: string,
    EventError: string,
    error_str: string
}

interface AbsFD {
    [fieldName: string]: FieldDescription,
}

interface IState {
    validators?: Validators;
    [fieldName: string]: any,
}

interface IProps {
    fieldDescription: AbsFD
}

export type {IProps, IState}