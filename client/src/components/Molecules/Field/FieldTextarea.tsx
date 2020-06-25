import Textarea from '../../Atoms/Textarea/Textarea';
import ErrorPlaceholder from '../../Atoms/ErrorPlaceholder/ErrorPlaceholder';
import React from 'react';
import { ITextFieldErrored } from './IField';
import { ITextValid, IValid, IVerifiable, ValidatorState } from '../../../services/validator/validator';

interface IProps extends ITextFieldErrored {}

export default function FieldTextarea(props: IProps) {
    const valid = props.validate(props.value);

    return (
        <>
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
            <ErrorPlaceholder valid={valid} value={props.errorText} showStrategy={props.showErrorStrategy} />
        </>
    );
}
