import React from "react";
import "../../styles/main.scss"
import "../../styles/input.scss"
import {IProps, IState} from "./IRegisterForm";
import {FieldInput} from "../../Molecules/Field/FieldInput";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom";
import Form from "../Form/Form";
import {initialValidator, Validators} from "../IValidators";
import {loginQuery} from "../Form/FormHelper";
import FieldError from "../../Atoms/FieldError/FieldError";
import {Valid} from "../IAuth";


export default class RegisterForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            repassword: {value: '', valid: Valid.Intermediate},
            login: {value: '', valid: Valid.Intermediate},
            email: {value: '', valid: Valid.Intermediate},
            password: {value: '', valid: Valid.Intermediate},
            referrer: <></>,
            serverError: {value: '', valid: Valid.Intermediate},
            validators: initialValidator
        }
    }

    onValidatorChange = (validators: Validators) => {
        this.setState({validators: validators})
    }


    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = !!fieldValue.match(this.state.validators![fieldName].regexp)
        if (fieldValid) return Valid.Acceptable
        else return Valid.Invalid
    }


    comparePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valid = this.validateField(event.target.name, event.target.value)

        let isPasswordEqual = Valid.Invalid
        if (event.target.value === this.state.repassword.value) {
            isPasswordEqual = Valid.Acceptable
        } else {
            isPasswordEqual = Valid.Invalid
        }

        this.setState({
            repassword: {
                value: this.state.repassword.value,
                valid: isPasswordEqual
            }
        })
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    compareRepassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valid = this.validateField(event.target.name, event.target.value) && event.target.value === this.state.password.value
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }


    submitBtnHandler = async (event: React.FormEvent) => {
        const error = await loginQuery(event, ROUTES.REGISTER, {
            email: this.state.email.value,
            password: this.state.password.value,
            login: this.state.login.value
        });
        if (error) {
            this.setState({serverError: error})
        } else {
            this.setState({referrer: <Redirect to={ROUTES.LANDING}/>})
        }
    }

    render() {
        const fd = this.state
        const v = this.state.validators

        return (
            <div className="inputForm">
                {this.state.referrer}
                <Form onValidatorChange={this.onValidatorChange} onSubmit={this.submitBtnHandler}
                      action={ROUTES.REGISTER} buttonName="Зарегистрироваться">
                    <FieldInput fieldName="email" regexp={v!.email.regexp} valid={fd.email.valid} autofocus
                                validateFunc={this.handleUserInput} value={fd.email.value} text={v!.email.error_str}/>
                    <FieldInput fieldName="login" regexp={v!.login.regexp} valid={fd.login.valid}
                                validateFunc={this.handleUserInput} value={fd.login.value} text={v!.login.error_str}/>

                    <FieldInput fieldName="password" regexp={v!.password.regexp} valid={fd.password.valid}
                                validateFunc={this.comparePassword} value={fd.password.value} text={v!.password.error_str}/>
                    <FieldInput fieldName="repassword" fieldType="password" regexp={v!.repassword.regexp}
                                valid={fd.repassword.valid}
                                validateFunc={this.compareRepassword} value={fd.repassword.value}
                                text={v!.repassword.error_str}/>
                    <FieldError valid={this.state.serverError.valid} text={this.state.serverError.value}/>

                </Form>

            </div>

        )
    }
}

