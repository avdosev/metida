import Textarea from "../../Atoms/Textarea/Textarea";
import FieldError from "../../Atoms/FieldError/FieldError";
import React from "react";
import {IField, IFieldError} from "../../Atoms/IField";


interface IProps extends IFieldError, IField {

}

export function FieldTextarea(props: IProps) {



    return <>
        <Textarea
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