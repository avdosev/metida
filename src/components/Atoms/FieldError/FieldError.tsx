import React from "react";
import {IProps} from "./IFieldError";
import "./error.css"


export default function FieldError(props: IProps) {
    let spanError: JSX.Element
    if (!props.valid) {
        spanError = <span className="error active" aria-live="polite"> {props.text} </span>
    } else {
        spanError = <span className="error" aria-live="polite"/>
    }

    return (spanError)
}