import {Valid} from "../Organisms/IAuth";
import React from "react";

interface IField {
    fieldName: string,
    validateFunc: (event: React.ChangeEvent<any>) => void,
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
    valid: Valid,
    text: string
}

export type {IField, IFieldError}