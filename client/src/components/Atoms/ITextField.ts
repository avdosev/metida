import React from "react";

interface ITextField {
    fieldName: string,
    validateFunc: (event: React.ChangeEvent<any>) => void,
    regexp: string,
    value: string

    fieldId?: string
    fieldClass?: string,
    fieldType?: string,
    fieldDescription?: string,
    placeholder?: string,
    autofocus?: boolean
}

export type {ITextField};