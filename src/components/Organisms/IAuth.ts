import {Validators} from "./IValidators";

interface Field {
    value: string,
    valid: boolean
}

interface IIState {
    validators?: Validators;
    [name: string]: any;
}

export type {Field, IIState}