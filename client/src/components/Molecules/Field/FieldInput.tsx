import React from "react";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import Input from "../../Atoms/Input/Input";
import {ITextFieldErrored} from "./IField";
import {IValid, IVerifiable} from "../../../services/validator/validator";

interface IState extends IValid {

}

interface IProps extends ITextFieldErrored {

}

export default class FieldInput extends React.Component<IProps, IState> implements IVerifiable {
    render() {
        return (<>
            <Input
                autofocus={this.props.autofocus}
                fieldId={this.props.fieldId}
                fieldClass={this.props.fieldClass}
                fieldName={this.props.fieldName}
                onChange={this.props.onChange}
                regexp={this.props.regexp}
                fieldType={this.props.fieldType}
                fieldDescription={this.props.fieldDescription}
                placeholder={this.props.placeholder}
                value={this.props.value}
            />
            <ErrorPlaceholder valid={this.state.valid} value={this.props.value} showStrategy={this.props.showErrorStrategy} />
        </>);
    }
}


