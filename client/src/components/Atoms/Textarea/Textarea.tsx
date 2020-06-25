import React from 'react';
import { ITextInput } from '../ITextField';

interface IProps extends ITextInput {}

export default function Textarea(props: IProps) {
    return (
        <>
            <textarea
                className={props.fieldClass ?? props.fieldName}
                id={props.fieldId ?? props.fieldName}
                name={props.fieldName}
                placeholder={props.placeholder ?? props.fieldName}
                required
                onChange={props.onChange}
                value={props.value}
            />
        </>
    );
}
