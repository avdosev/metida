import Textarea from "../../Atoms/Textarea/Textarea";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import React from "react";
import {ITextFieldErrored} from "./IField";
import {IValid, IVerifiable, ValidatorState} from "../../../services/validator/validator";

interface IState extends IValid {

}

interface IProps extends ITextFieldErrored {

}

export default class FieldTextarea extends React.Component<IProps, IState> implements IVerifiable {
    validate(): ValidatorState {
        return this.props.validate(this.props.value)
    }

    changeValidatorState(state: ValidatorState): void {
        this.setState({valid: state})
    }

    render() {
        return (<>
            <Textarea
                fieldClass={this.props.fieldClass}
                fieldId={this.props.fieldId}
                fieldName={this.props.fieldName}
                onChange={this.props.onChange}
                regexp={this.props.regexp}
                fieldType={this.props.fieldType}
                fieldDescription={this.props.fieldDescription}
                placeholder={this.props.placeholder}
                value={this.props.value}
            />
            <ErrorPlaceholder valid={this.state.valid} value={this.props.errorText} showStrategy={this.props.showErrorStrategy} />
        </>);
    }
}