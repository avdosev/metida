import React from "react";
import FormError from "../../Atoms/FormError/FormError";
import {Field, IIState} from "../../Pages/Auth/IAuth";
import {Validators} from "../../Pages/Auth/IValidators";
import FieldInput from "../../Atoms/Field/Field";

interface FieldDescription {
    regexp: string,
    EventError: string,
    error_str: string
}

interface AbsFD {
    [fieldName: string]: FieldDescription,

    //[Symbol.iterator](): IterableIterator<FieldDescription>;
}

interface IState {
    validators?: Validators;

    [fieldName: string]: any,
}

interface IProps {
    fieldDescription: AbsFD
}

export default class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        let fieldNames = [] // омагад, почему у моих обхектов нет метода keys

        for (const fieldName in props.fieldDescription) {
            fieldNames.push(fieldName)
        }

        let fieldDescription = {}
        for (const field of fieldNames) {
            // @ts-ignore
            fieldDescription[field] = {valid: false, value: ''}
        }

        this.state = {...fieldDescription}

    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.props.fieldDescription[fieldName].regexp)
        return !!fieldValid;
    }

    submitBtnHandler = () => {

    }


    render() {
        let fieldsSet: Array<JSX.Element> = []

        for (const field in this.props.fieldDescription) {
            const elem = <>
                <FieldInput
                    fieldName={field}
                    regexp={this.state[field].regexp}
                    validateFunc={this.handleUserInput}
                    value={this.state[field].value}
                />
                <FormError valid={this.state[field].valid}
                           text={this.props.fieldDescription[field].error_str}/>
            </>
            fieldsSet.push(elem)

        }


        return (
            <div className="reg">
                {fieldsSet}
                <button id="submit" onClick={this.submitBtnHandler} className="welcome">Войти</button>
                <span id="serverError" aria-live="polite"/>
            </div>)
    }


}
