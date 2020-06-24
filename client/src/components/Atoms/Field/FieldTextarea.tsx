import Textarea from '../Textarea/Textarea';
import FieldError from '../FieldError/FieldError';
import React from 'react';
import { IField, IFieldError } from '../IField';

interface IProps extends IFieldError, IField {}

export function FieldTextarea(props: IProps) {
    return (
        <>
            <Textarea
                fieldClass={props.fieldClass}
                fieldId={props.fieldId}
                fieldName={props.fieldName}
                validateFunc={props.validateFunc}
                regexp={props.regexp}
                fieldType={props.fieldType}
                fieldDescription={props.fieldDescription}
                placeholder={props.placeholder}
                value={props.value}
            />
            <FieldError valid={props.valid} text={props.text} />
        </>
    );
}
