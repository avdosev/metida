import React from "react";
import FieldError from "../FieldError/FieldError";
import Input from "../Input/Input";


interface IState {

}

interface IProps {
    fieldName: string,
    validateFunc: (event: any) => void,
    regexp: string,
    value: string,

    fieldType?: string,
    fieldDescription?: string,
    placeholder?: string,



    valid: boolean,
    text: string
}

export default class Field extends React.Component<IProps, IState> {


    render() {
        return <>
            <Input
                fieldName={this.props.fieldName}
                validateFunc={this.props.validateFunc}
                regexp={this.props.regexp}
                fieldType={this.props.fieldType}
                fieldDescription={this.props.fieldDescription}
                placeholder={this.props.placeholder}
                value={this.props.value}
            />
            <FieldError valid={this.props.valid} text={this.props.text} />
        </>;
    }
}
