import React from "react";
import "../../../main.css"
import "../../../input.css"
import {showError, hideError, checkValidation} from "../../input_error";
import {get, post} from "../../../Router"
import {Validators} from "../IValidators";
import FormError from "../FormError";

interface IProps {

}

interface Field {
    value: string,
    valid: boolean
}

interface IState {
    [name: string]: any,
    validators?: Validators
}




export default class Register extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            repassword: {value: '', valid: false},
            login: {value: '', valid: false},
            email: {value: '', valid: false},
            password: {value: '', valid: false},
            validators: undefined}
    }

    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.setState({validators: validators})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }


    comparePasswords = (event: any) => {
        let valid = this.validateField(event.target.name, event.target.value)
        if (event.target.name == "repassword") { //TODO средней понятности и красоты код, сравнить внутри колбека не получится, т.к. компонент не обновится
            valid = valid && event.target.value === this.state.password.value
        }

        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})


    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    errorHandler = () => {}


    submitBtnHandler = () => {
        const emailValid = this.state.email.valid
        const passwordValid = this.state.password.valid

        if (!emailValid) {

        } else if (!passwordValid) {

        } else {
            console.log("запрос")

            const mycallback = (response: any) => { // ох уж не знаю, мне кажется, это хуйня
                if (response.ok) {
                    document.location.href = document.referrer || "/"
                } else {
                    response.text().then(this.errorHandler)
                }
            }
            post("/sign_In", {email: this.state.email, password: this.state.password}, mycallback)

        }

    }

    render() {
        return (
            <div className="inputForm">
                <div className="reg">
                    <p>Email </p>
                    <input id="email" type="email" name="email" placeholder="Type email" required
                           pattern='.+@.+\..+'
                           onChange={this.handleUserInput}
                           value={this.state.email.value}
                    />

                    <FormError valid={this.state.email.valid} text={this.state.validators ? this.state.validators.email.error_str : ''}/>

                    <p>Login</p>
                    <input id="login" type="login" name="login" placeholder="Type login" required
                           pattern='^\w{3,20}$'
                           onChange={this.handleUserInput}
                           value={this.state.login.value}
                    />

                    <FormError valid={this.state.login.valid} text={this.state.validators ? this.state.validators.login.error_str : ''}/>

                    <p>Password </p>
                    <input id="password" type="password" name="password" placeholder="Type password" required
                           onChange={this.comparePasswords}
                           value={this.state.password.value}
                           pattern='.{5,50}'/>
                    <FormError valid={this.state.password.valid} text={this.state.validators ? this.state.validators.password.error_str : ''}/>

                    <p>Repeat password </p>
                    <input id="repassword" type="password" name="repassword" placeholder="Type password" required
                           onChange={this.comparePasswords}
                           value={this.state.repassword.value}
                           pattern='.{5,50}'/>
                    <FormError valid={this.state.repassword.valid} text={this.state.validators ? this.state.validators.repassword.error_str : ''}/>
                    <button id="submit" onClick={this.submitBtnHandler} className="welcome">Войти</button>
                    <span id="serverError" aria-live="polite"/>
                </div>
            </div>

        )
    }
}

