interface ValidatorFields {
    error_str: string,
    EventError: Array<string>,
    regexp: string
}

interface Validators {
    [fieldName: string]: ValidatorFields
}

export type {Validators}