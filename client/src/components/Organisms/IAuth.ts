import {Validators} from "./IValidators";

interface Field {
    value: string,
    valid: boolean
}

interface IIState {
    validators: Validators;
    referrer: JSX.Element,
    [name: string]: any;
}

export type {Field, IIState}