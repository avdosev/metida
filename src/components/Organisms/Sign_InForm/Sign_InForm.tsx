import React from "react";
import "../../main.css"
import "../../input.css"
import {IProps, IState} from  "./ISign_InForm"
import Field from "../../Atoms/Field/Field";
import {post} from "../../Router";


export default class Sign_InForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            email: {value: '', valid: false}, password: {value: '', valid: false},
            validators: {email: {error_str: '', regexp: '', EventError: ['']}, password: {error_str: '', regexp: '', EventError: ['']}}}
    }

    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.setState({validators: validators})

    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }

    errorHandler() {

    }

    submitBtnHandler = async () => {
        const allValid = this.state.email.valid && this.state.password.valid

        if (!allValid) {

        } else {
            console.log("запрос")

            const mycallback = (response: any) => { // ох уж не знаю, мне кажется, это хуйня
                if (response.ok) {
                    document.location.href = document.referrer || "/"
                } else {
                    response.text().then(this.errorHandler)
                }
            }
            await post("/sign_In", {email: this.state.email, password: this.state.password}, mycallback)

        }

    }

    render() {
        const fd = this.state
        const v = this.state.validators

        return (
            <div className="inputForm">
                <div className="reg">
                    <Field fieldName="email" regexp={v!.email.regexp} valid={fd.email.valid}
                           validateFunc={this.handleUserInput} value={fd.email.value} text={v!.email.error_str}/>
                    <Field fieldName="password" regexp={v!.password.regexp} valid={fd.password.valid}
                           validateFunc={this.handleUserInput} value={fd.password.value} text={v!.password.error_str}/>

                    <button id="submit" onClick={this.submitBtnHandler} className="welcome">Войти</button>
                    <span id="serverError" aria-live="polite"/>
                </div>
            </div>

        )
    }
}

