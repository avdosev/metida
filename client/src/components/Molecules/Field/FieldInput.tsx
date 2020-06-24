import React from "react";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import Input from "../../Atoms/Input/Input";
import {ITextFieldErrored} from "./IField";
import {ITextValid, IValid, IVerifiable, ValidatorState} from "../../../services/validator/validator";

interface IState extends ITextValid {

}

interface IProps extends ITextFieldErrored {
}

export default class FieldInput extends React.Component<IProps, IState> implements IVerifiable {
    constructor(props: IProps) {
        super(props);
        this.state = {
            'value': props.value,
            'valid': this.props.validate(props.value)
        }
    }

    public validate(): ValidatorState {
        return this.props.validate(this.state.value)
    }

    public changeValidatorState(state: ValidatorState): void {
        this.setState({valid: state})
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({'value': event.target.value});
        if (this.props.onChange) this.props.onChange(event)
    }

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
                value={this.state.value}
            />
            <ErrorPlaceholder valid={this.state.valid} value={this.props.errorText} showStrategy={this.props.showErrorStrategy} />
        </>);
    }
}


