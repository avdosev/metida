import React from "react";
import "./error.css"

interface IProps {
    valid: boolean
    text?: string
}

export default function FormError(props: IProps) {
    let spanError: JSX.Element
    if (!props.valid) {
        spanError = <span className="error active" aria-live="polite"> {props.text} </span>
    }
    else {
        spanError = <span className="error" aria-live="polite"/>
    }

    return (spanError)
}