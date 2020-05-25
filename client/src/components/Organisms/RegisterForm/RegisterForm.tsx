import React from "react";
import "../../main.css"
import "../../input.css"
import {IProps, IState} from "./IRegisterForm";
import {post} from "../../Router";
import Field from "../../Molecules/Field/Field";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom";
import Form from "../Form/Form";
import {Validators} from "../IValidators";

export default class RegisterForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            repassword: {value: '', valid: false},
            login: {value: '', valid: false},
            email: {value: '', valid: false},
            password: {value: '', valid: false},
            referrer: <></>,
            validators: {login: {error_str: '', regexp: '', EventError: ['']}, repassword: {error_str: '', regexp: '', EventError: ['']}, email: {error_str: '', regexp: '', EventError: ['']}, password: {error_str: '', regexp: '', EventError: ['']}}}
    }


    onValidatorChange = (validators: Validators) => {
        this.setState({validators: validators})
    }


    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }


    comparePassword = (event: any) => {
        let valid = this.validateField(event.target.name, event.target.value)
        this.setState({repassword: {value: this.state.repassword.value, valid: event.target.value === this.state.repassword.value}})
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    compareRepassword = (event: any) => {
        let valid = this.validateField(event.target.name, event.target.value) && event.target.value === this.state.password.value
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    handleUserInput = (event: any) => {
        console.log(this.state)

        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    errorHandler = () => {}


    submitBtnHandler = async (event: any) => {
        const allValid = this.state.email.valid && this.state.password.valid && this.state.login.valid && this.state.repassword.valid

        if (allValid ){
            console.log("запрос")

            const mycallback = (response: any) => { // ох уж не знаю, мне кажется, это хуйня
                if (response.ok) {
                    return response.json()
                } else {
                    response.text().then(this.errorHandler)
                }
            }
            const res = await post(ROUTES.REGISTER, {email: this.state.email.value, password: this.state.password.value}, mycallback)
            localStorage.setItem("user", JSON.stringify(res))
            this.setState({referrer: <Redirect to={ROUTES.LANDING} />})
        }

    }

    render() {
        const fd = this.state
        const v = this.state.validators

        return (
            <div className="inputForm">
                {this.state.referrer}
                <Form onValidatorChange={this.onValidatorChange} onSubmit={this.submitBtnHandler}>
                    <Field fieldName="email" regexp={v!.email.regexp} valid={fd.email.valid}
                           validateFunc={this.handleUserInput} value={fd.email.value} text={v!.email.error_str}/>
                    <Field fieldName="login" regexp={v!.login.regexp} valid={fd.login.valid}
                           validateFunc={this.handleUserInput} value={fd.login.value} text={v!.login.error_str}/>

                    <Field fieldName="password" regexp={v!.password.regexp} valid={fd.password.valid}
                           validateFunc={this.comparePassword} value={fd.password.value} text={v!.password.error_str}/>
                    <Field fieldName="repassword" fieldType="password" regexp={v!.repassword.regexp} valid={fd.repassword.valid}
                           validateFunc={this.compareRepassword} value={fd.repassword.value} text={v!.repassword.error_str}/>

                    <button id="submit" type="submit" className="welcome" onClick={this.submitBtnHandler}>Войти</button>
                    <span id="serverError" aria-live="polite"/>
                </Form>

            </div>

        )
    }
}

