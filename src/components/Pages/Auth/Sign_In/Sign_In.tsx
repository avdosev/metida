import React from "react";
import "../../../main.css"
import "../../input.css"
import {showError, hideError, checkValidation} from "../input_error.js";
import {get, post} from "../../Router"
import {Validators} from "./IValidators";
import FormError from "./FormError";

interface IProps {

}

interface Field {
    value: string,
    valid: boolean
}

interface IState {
    email: Field,
    password: Field,
    validators?: Validators
}



export default class Sign_In extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {email: {value: '', valid: false}, password: {value: '', valid: false}, validators: undefined}
    }

    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.setState({validators: validators})
    }

    inputPassword = (event: any) => {
        const valid = this.validateField("password", this.state.password.value)
        this.setState({password: {value: event.target.value, valid: valid}}, () => console.log(this.state.password))
    }

    inputEmail = (event: any) => {
        const valid = this.validateField("email", this.state.email.value)
        this.setState({email: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }


    errorHandler = (err: any) => {
    }

    // handleUserInput = (e: any) => { // я бы сделал так, если бы не типы
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     this.setState({[name]: value});
    // }


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
                           onChange={this.inputEmail}
                           value={this.state.email.value}
                    />

                    <FormError valid={this.state.email.valid} text={this.state.validators ? this.state.validators.email.error_str : ''}/>

                    <p>Password </p>
                    <input id="password" type="password" name="password" placeholder="Type password" required
                           onChange={this.inputPassword}
                           value={this.state.password.value}
                           pattern='.{5,}'/>
                    <FormError valid={this.state.password.valid} text={this.state.validators ? this.state.validators.password.error_str : ''}/>
                    <button id="submit" onClick={this.submitBtnHandler} className="welcome">Войти</button>
                    <span id="serverError" aria-live="polite"/>
                </div>
            </div>

        )
    }
}

