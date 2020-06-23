import React from "react";
import "../../styles/main.scss"
import "../../styles/input.scss"
import {IProps, IState} from "./IRegisterForm";
import FieldInput from "../../Molecules/Field/FieldInput";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom";
import Form from "../../Molecules/Form/Form";
import {validators, Validators, ValidatorState} from "../IValidators";
import {loginQuery} from "../../../services/FormHelper";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import {getCurrentUser} from "../../../services/user";
import {ChangeHeaderInterface} from "../../../containers/ChangeHeaderEvent/dispatcher";
import ValidateForm from "../ValidableForm/ValidateForm";
import {IntermediateIsValid} from "../../../services/validator/show_error_strategies";


export default class RegisterForm extends React.Component<ChangeHeaderInterface, IState> {
    constructor(props: ChangeHeaderInterface) {
        super(props)
        this.state = {
            repassword: {value: '', valid: ValidatorState.Intermediate},
            login: {value: '', valid: ValidatorState.Intermediate},
            email: {value: '', valid: ValidatorState.Intermediate},
            password: {value: '', valid: ValidatorState.Intermediate},
            // referrer: <></>,
            serverError: {value: '', valid: ValidatorState.Intermediate},
            validators: validators
        }
    }

    comparePassword = (event: React.ChangeEvent<HTMLInputElement>) => {


        // let isPasswordEqual = ValidatorState.Invalid
        // if (event.target.value === this.state.repassword.value) {
        //     isPasswordEqual = ValidatorState.Acceptable
        // } else {
        //     isPasswordEqual = ValidatorState.Invalid
        // }
    }

    compareRepassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const valid = this.validateField(event.target.name, event.target.value) && event.target.value === this.state.password.value
        // this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    submitBtnHandler = async (event: React.FormEvent) => {
        let error = await loginQuery(event, ROUTES.REGISTER, {
            email: this.state.email.value,
            password: this.state.password.value,
            login: this.state.login.value

        });
        if (error) {
            if (error.match("Cannot POST")) {
                console.warn("Сервер не отвечает")
                error = "Сервер не отвечает, попробуйте позже."
            }
            this.setState({serverError: {value: error, valid: Valid.Invalid}})
        } else {
            const user = getCurrentUser()
            if (!user) throw new Error("После входа, нам не вернулся пользователь, это ужасно")

            this.props.signIn(user)

            this.setState({referrer: <Redirect to={ROUTES.LANDING}/>})
            console.log(this.state)
        }

    }

    render() {
        const fd = this.state
        const v = this.state.validators

        return (
            <div className="inputForm">
                {this.state.referrer}
                <ValidateForm onSubmit={this.submitBtnHandler}
                      action={ROUTES.REGISTER}>
                    <FieldInput fieldName="email" regexp={v!.email.regexp} valid={fd.email.valid} autofocus
                                 value={fd.email.value} errorText={v!.email.error_str}/>
                    <FieldInput fieldName="login" regexp={v!.login.regexp} valid={fd.login.valid}
                                 value={fd.login.value} errorText={v!.login.error_str}/>

                    <FieldInput fieldName="password" regexp={v!.password.regexp} valid={fd.password.valid}
                                validateFunc={this.comparePassword} value={fd.password.value} errorText={v!.password.error_str}/>
                    <FieldInput fieldName="repassword" fieldType="password" regexp={v!.repassword.regexp}
                                valid={fd.repassword.valid}
                                validateFunc={this.compareRepassword} value={fd.repassword.value}
                                errorText={v!.repassword.error_str}/>
                    <button type="submit" className="mainButton">Зарегистрироваться</button>
                    <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value} />

                </ValidateForm>

            </div>

        )
    }
}

