import {Validators, ValidatorState} from "./IValidators";


interface IIState {
    validators: Validators;
    referrer?: JSX.Element,
    [name: string]: any;
    [Symbol.iterator](): IterableIterator<Field>
}

export type {IIState}