import React, {FunctionComponent} from "react";
import FieldError from "../../Atoms/FieldError/FieldError";
import Input from "../../Atoms/Input/Input";
import {IField, IFieldError} from "../../Atoms/IField";
import Textarea from "../../Atoms/Textarea/Textarea";


interface IState {

}

interface IProps extends IFieldError, IField {

}

export function FieldInput(props: IProps) {
    return <>
        <Input
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