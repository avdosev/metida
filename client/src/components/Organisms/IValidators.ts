interface ValidatorFields {
    error_str: string;
    EventError: Array<string>;
    regexp: string;
}

interface IValidators {
    [fieldName: string]: ValidatorFields;
}

interface Validators extends IValidators {
    header: ValidatorFields;
    comment: ValidatorFields;
    disclaimer: ValidatorFields;
    content: ValidatorFields;
    email: ValidatorFields;
    repassword: ValidatorFields;
    password: ValidatorFields;
    login: ValidatorFields;
}

const initialValidator: Validators = {
    login: { error_str: '', regexp: '', EventError: [''] },
    repassword: { error_str: '', regexp: '', EventError: [''] },
    email: { error_str: '', regexp: '', EventError: [''] },
    password: { error_str: '', regexp: '', EventError: [''] },
    comment: { error_str: '', regexp: '', EventError: [''] },
    content: { error_str: '', regexp: '', EventError: [''] },
    disclaimer: { error_str: '', regexp: '', EventError: [''] },
    header: { error_str: '', regexp: '', EventError: [''] },
};

export type { Validators };
export { initialValidator };
