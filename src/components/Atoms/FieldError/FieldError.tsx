import React from "react";
import {IFieldError} from "../IField";
import "./error.css"


interface IProps extends IFieldError {

}


export default function FieldError(props: IProps) {
    let spanError: JSX.Element
    if (!props.valid) {
        spanError = <span className="error active" aria-live="polite"> {props.text} </span>
    } else {
        spanError = <span className="error" aria-live="polite"/>
    }

    return (spanError)
}