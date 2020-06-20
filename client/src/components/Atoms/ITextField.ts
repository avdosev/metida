import React from "react";

interface ITextField {
    onChange: (event: React.ChangeEvent<any>) => void
    value: string
    fieldName: string

    fieldId?: string
    fieldClass?: string,
    fieldType?: string,
    fieldDescription?: string,
    placeholder?: string,
    autofocus?: boolean
}

interface ITextInput extends ITextField {
    regexp: string
}

export type {ITextField, ITextInput};