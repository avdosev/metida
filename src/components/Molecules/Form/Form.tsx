import React from "react";
import FormError from "../../Atoms/FormError/FormError";
import {Field, IIState} from "../../Pages/Auth/IAuth";

interface FieldDescription {
    fieldName: string,
    regexp: string,
    // field: Field
}
//
// interface IState {
//
// }
//
// interface IProps {
//
// }

export default class Form extends React.Component<Array<FieldDescription>, IIState> {
    constructor(props: Array<FieldDescription>) {
        super(props)
        this.state = {email: {value: '', valid: false}, password: {value: '', valid: false}, validators: undefined}
    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }

    submitBtnHandler = () => {

    }


    render() {
        let fieldsSet: Array<JSX.Element> = []

        for (const field of this.props) {
            const elem =
                <>
                    <p>{field.fieldName} </p>
                    <input id={field.fieldName}
                           type={field.fieldName}
                           name={field.fieldName}
                           placeholder={field.fieldName}
                           required
                           pattern={field.regexp}
                           onChange={this.handleUserInput}
                           value={this.state[field.fieldName].value}
                    />

                    <FormError valid={this.state[field.fieldName].valid}
                               text={this.state.validators ? this.state.validators[field.fieldName].error_str : ''}/>
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
