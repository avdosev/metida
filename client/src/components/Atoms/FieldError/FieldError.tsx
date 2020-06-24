import React from 'react';
import { IFieldError } from '../IField';
import './error.css';
import { Valid } from '../../Organisms/IAuth';

interface IProps extends IFieldError {}

export default function FieldError(props: IProps) {
    let notValid;

    notValid = props.valid === Valid.Invalid;

    let spanError: JSX.Element;
    if (notValid) {
        spanError = (
            <span className="error active" aria-live="polite">
                {' '}
                {props.text}{' '}
            </span>
        );
    } else {
        spanError = <span className="error" aria-live="polite" />;
    }

    return spanError;
}
