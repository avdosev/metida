import React from "react";
import FieldError from "../../Atoms/FieldError/FieldError";
import Input from "../../Atoms/Input/Input";
import {IField, IFieldError} from "../../Atoms/IField";
import {Valid} from "../../Organisms/IAuth";


interface IProps extends IFieldError, IField {

}

export function FieldInput(props: IProps) {

    return <>
        <Input
            autofocus={props.autofocus}
            fieldId={props.fieldId}
            fieldClass={props.fieldClass}
            fieldName={props.fieldName}
            validateFunc={props.validateFunc}
            regexp={props.regexp}
            fieldType={props.fieldType}
            fieldDescription={props.fieldDescription}
            placeholder={props.placeholder}
            value={props.value}
        />
        <FieldError valid={props.valid} text={props.text} />
    </>;

}


