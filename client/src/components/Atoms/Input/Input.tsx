import React from "react";
import {IField} from "../IField";


interface IProps extends IField {}


const Input: React.FC<IProps> = (props: IProps) => {
     return(<>
        <p>{props.fieldDescription ?? props.fieldName} </p>
        <input
            id={props.fieldId ?? props.fieldName}
            className={props.fieldClass ?? props.fieldName}
            type={props.fieldType ?? props.fieldName}
            name={props.fieldName}
            placeholder={props.placeholder ?? props.fieldName}
            required
            pattern={props.regexp}
            onChange={props.validateFunc}
            value={props.value}
            autoFocus={props.autofocus}
        />
    </>)

}

export default Input


