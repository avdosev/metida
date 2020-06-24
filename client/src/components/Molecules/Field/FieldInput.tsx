import React from "react";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import Input from "../../Atoms/Input/Input";
import {ITextFieldErrored} from "./IField";

interface IProps extends ITextFieldErrored {
}

export default function FieldInput(props: IProps) {
    const valid = props.validate(props.value)
    
    return (<>
        <Input
            autofocus={props.autofocus}
            fieldId={props.fieldId}
            fieldClass={props.fieldClass}
            fieldName={props.fieldName}
            onChange={props.onChange}
            regexp={props.regexp}
            fieldType={props.fieldType}
            fieldDescription={props.fieldDescription}
            placeholder={props.placeholder}
            value={props.value}
        />
        <ErrorPlaceholder valid={valid} value={props.errorText} showStrategy={props.showErrorStrategy} />
    </>);
    
}


