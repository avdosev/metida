import React from "react";
import {IProps, IState} from "./IForm";
import Field from "../../Molecules/Field/Field";


export default class Form_UNSAFE extends React.Component<IProps, IState> {
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
        console.log(this.state)
        console.log(this.props)
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
                       regexp={this.props.fieldDescription[field].regexp}
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
