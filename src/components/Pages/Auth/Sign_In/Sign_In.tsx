import React from "react";
import "../../../main.css"
import "../../../input.css"
import {post} from "../../../Router"
import FormError from "../../../Atoms/FormError/FormError";
import {IProps, IState} from "./ISign_In";


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

    submitBtnHandler = () => {
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

                    <p>Password </p>
                    <input id="password" type="password" name="password" placeholder="Type password" required
                           onChange={this.handleUserInput}
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

