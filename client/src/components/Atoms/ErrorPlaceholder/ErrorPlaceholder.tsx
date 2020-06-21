import React from "react";
import "./error.css"
import {ValidatorState, IValid} from "../../../services/validator/validator";
import {IShowStrategy, IntermediateIsValid} from "../../../services/validator/show_error_strategies";


interface IProps extends IValid {
    value: string
    showStrategy?: IShowStrategy
}


export default function ErrorPlaceholder(props: IProps) {
    const show = (props.showStrategy ?? IntermediateIsValid)(props.valid);

    const spanError: JSX.Element = show ?
        <span className="error active" aria-live="polite"> {props.value} </span> :
        <span className="error" aria-live="polite"/>;

    return spanError
}