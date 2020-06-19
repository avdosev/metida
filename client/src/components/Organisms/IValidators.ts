import { regexpVerifiable } from "../../services/validator/validator";
export { ValidatorState } from "../../services/validator/validator";

interface ValidatorFields {
    error_str: string,
    EventError: Array<string>,
    regexp: string
}

export interface Validators {
    header: ValidatorFields,
    comment: ValidatorFields
    disclaimer: ValidatorFields
    content: ValidatorFields
    email: ValidatorFields
    repassword: ValidatorFields
    password: ValidatorFields
    login: ValidatorFields
}

export const initialValidator: Validators = {
    login: {error_str: '', regexp: '', EventError: ['']},
    repassword: {error_str: '', regexp: '', EventError: ['']},
    email: {error_str: '', regexp: '', EventError: ['']},
    password: {error_str: '', regexp: '', EventError: ['']},
    comment: {error_str: '', regexp: '', EventError: ['']},
    content: {error_str: '', regexp: '', EventError: ['']},
    disclaimer: {error_str: '', regexp: '', EventError: ['']},
    header: {error_str: '', regexp: '', EventError: ['']}
}
