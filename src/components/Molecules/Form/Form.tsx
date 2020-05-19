import React from "react";
import {Validators} from "../../Pages/Auth/IValidators";
import FieldInput from "../../Atoms/Field/Field";
import {IProps, IState} from "./IForm";
import FieldError from "../../Atoms/FieldError/FieldError"
import Field from "../../Atoms/Field/Field";


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
            const elem =
                <Field fieldName={field}
                       regexp={this.state[field].regexp}
                       validateFunc={this.handleUserInput}
                       value={this.state[field].value}
                       valid={this.state[field].valid}
                       text={this.props.fieldDescription[field].error_str} />

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
