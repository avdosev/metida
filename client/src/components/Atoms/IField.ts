interface IField {
    fieldName: string,
    validateFunc: (event: any) => void,
    regexp: string,
    value: string,

    fieldId?: string
    fieldClass?: string,
    fieldType?: string,
    fieldDescription?: string,
    placeholder?: string,
    autofocus?: boolean
}

interface IFieldError {
    valid: boolean
    text: string
}

export type {IField, IFieldError}