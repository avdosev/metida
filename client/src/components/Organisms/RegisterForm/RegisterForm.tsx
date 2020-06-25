import React from "react";
import "../../styles/main.scss"
import "../../styles/input.scss"
import FieldInput from "../../Molecules/Field/FieldInput";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom";
import {Field, validators, ValidatorState} from "../IValidators";
import {loginQuery} from "../../../services/FormHelper";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import {getCurrentUser} from "../../../services/user";
import {ChangeHeaderInterface} from "../../../containers/ChangeHeaderEvent/dispatcher";
import ValidateForm from "../ValidableForm/ValidateForm";
import {IReferable} from "../IRoute";
import {Container} from "../../../services/validator/container";
import {IntermediateIsValid} from "../../../services/validator/show_error_strategies";

interface IProps {

}


interface IState extends IReferable {
    repassword: string,
    login: string,
    email: string,
    password: string,
    serverError : Field,

}

export default class RegisterForm extends React.Component<ChangeHeaderInterface, IState> {
    constructor(props: ChangeHeaderInterface) {
        super(props)
        this.state = {
            repassword: '',
            login: '',
            email: '',
            password: '',
            referrer: null,
            serverError: {value: '', valid: ValidatorState.Intermediate},
        }
    }

    comparePasswords = (): ValidatorState => {
        let isPasswordEqual;
        if (this.state.password === this.state.repassword) {
            isPasswordEqual = ValidatorState.Acceptable
        } else {
            isPasswordEqual = ValidatorState.Invalid
        }
        return isPasswordEqual;
    }

    compareRepassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const valid = this.validateField(event.target.name, event.target.value) && event.target.value === this.state.password.value
        // this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    submitBtnHandler = async (event: React.FormEvent) => {
        let error = await loginQuery(event, ROUTES.REGISTER, {
            email: this.state.email,
            password: this.state.password,
            login: this.state.login,
        });
        if (error) {
            if (error.match("Cannot POST")) {
                console.warn("Сервер не отвечает")
                error = "Сервер не отвечает, попробуйте позже."
            }
            this.setState({serverError: {value: error, valid: ValidatorState.Invalid}})
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
        const v = validators

        // const email = new FieldInput({
        //     fieldName: "email",
        //     regexp: v!.email.regexp,
        //     autofocus: true,
        //     value: fd.email,
        //     errorText: v!.email.error_str,
        //     validate: (str) => ValidatorState.Intermediate,
        //     showErrorStrategy: IntermediateIsValid
        // })
        // const login = new FieldInput({
        //     fieldName: "login",
        //     regexp: v!.login.regexp,
        //     value: fd.login,
        //     errorText: v!.login.error_str,
        //     validate: (str) => ValidatorState.Intermediate,
        //     showErrorStrategy: IntermediateIsValid
        // })
        //
        // const password = new FieldInput({
        //     fieldName: "password",
        //     regexp: v!.password.regexp,
        //     value: fd.password,
        //     errorText: v!.password.error_str,
        //     validate: (str) => ValidatorState.Intermediate,
        //     showErrorStrategy: IntermediateIsValid
        // })
        //
        // const repassword = new FieldInput({ fieldName: "repassword",
        //     fieldType: "password",
        //     regexp: v!.repassword.regexp,
        //     value: fd.repassword,
        //     errorText: v!.repassword.error_str,
        //     validate: (str) => ValidatorState.Intermediate,
        //     showErrorStrategy: IntermediateIsValid
        // })

        // const container = new Container(email, login, password, repassword);

        return (
            <div className="inputForm">
                {/*{this.state.referrer}*/}
                {/*<ValidateForm onSubmit={this.submitBtnHandler}*/}
                {/*      action={ROUTES.REGISTER} verifiableElements={container}>*/}
                {/*    /!*{email}*!/*/}
                {/*    /!*{login}*!/*/}
                {/*    /!*{password}*!/*/}
                {/*    /!*{repassword}*!/*/}
                {/*    <button type="submit" className="mainButton">Зарегистрироваться</button>*/}
                {/*    <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value} />*/}

                {/*</ValidateForm>*/}

            </div>

        )
    }
}

