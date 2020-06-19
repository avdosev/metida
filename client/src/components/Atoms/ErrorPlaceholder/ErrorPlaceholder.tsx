import React from "react";
import "./error.css"
import {ValidatorState, IValid} from "../../../services/validator/validator";


interface IProps extends IValid {
    value: string
}


export default function ErrorPlaceholder(props: IProps) {
    const invalid = props.valid === ValidatorState.Invalid;

    const spanError: JSX.Element = invalid ?
        <span className="error active" aria-live="polite"> {props.value} </span> :
        <span className="error" aria-live="polite"/>;

    return spanError
}