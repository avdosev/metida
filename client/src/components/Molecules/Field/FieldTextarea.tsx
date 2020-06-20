import Textarea from "../../Atoms/Textarea/Textarea";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import React from "react";
import {ITextFieldErrored} from "./IField";


interface IProps extends ITextFieldErrored {

}

export function FieldTextarea(props: IProps) {
    return <>
        <Textarea
            fieldClass={props.fieldClass}
            fieldId={props.fieldId}
            fieldName={props.fieldName}
            onChange={props.onChange}
            regexp={props.regexp}
            fieldType={props.fieldType}
            fieldDescription={props.fieldDescription}
            placeholder={props.placeholder}
            value={props.value}
        />
        <ErrorPlaceholder valid={props.valid} value={props.value} />
    </>;
}