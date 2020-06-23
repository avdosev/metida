import React from "react";
import "../../styles/main.scss"
import "../../styles/input.scss"
import {IProps, IState} from "./ISign_InForm"
import FieldInput from "../../Molecules/Field/FieldInput";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom"
import Form from "../../Molecules/Form/Form";
import {validators, Validators, ValidatorState} from "../IValidators";
import {loginQuery} from "../../../services/FormHelper"
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import {initialUser, IPublicUser} from "../IPrivateUser";
import {getCurrentUser} from "../../../services/user";
import {ChangeHeaderInterface} from "../../../containers/ChangeHeaderEvent/dispatcher";
import ValidateForm from "../ValidableForm/ValidateForm";
import {Container} from "../../../services/validator/container";
import {IntermediateIsValid} from "../../../services/validator/show_error_strategies";


export default class Sign_InForm extends React.Component<ChangeHeaderInterface, IState> {
    constructor(props: ChangeHeaderInterface) {
        super(props)
        console.log(props)
        this.state = {
            email: {value: '', valid: ValidatorState.Intermediate}, password: {value: '', valid: ValidatorState.Intermediate},
            referrer: <></>,
            serverError: {value: '', valid: ValidatorState.Intermediate}
        }
    }

    submitBtnHandler = async (event: React.FormEvent) => {
        let error = await loginQuery(event, ROUTES.SIGN_IN, {
            email: this.state.email.value,
            password: this.state.password.value
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
            //да, я знаю что такое document.refferer, но в данном случае он не подходит, т.к. перерендер формы он считает за переход на другую страницу
        }
    }

    render() {
        const fd = this.state
        const v = this.state.validators

        const email = <FieldInput fieldName="email"
                                  regexp={v!.email.regexp}
                                  valid={fd.email.valid}
                                  autofocus
                                  value={fd.email.value}
                                  errorText={v!.email.error_str}
                                  showErrorStrategy={IntermediateIsValid}
                                  validate={(str) => ValidatorState.Intermediate}
        />;
        const password = <FieldInput fieldName="password"
                                     regexp={v!.password.regexp}
                                     valid={fd.password.valid}
                                     value={fd.password.value}
                                     errorText={v!.password.error_str}
                                     showErrorStrategy={IntermediateIsValid}
                                     validate={(str) => ValidatorState.Intermediate}
        />;

        const container = new Container();
        container.add(email, password);

        return (
            <div className="inputForm">
                {this.state.referrer}
                <ValidateForm onSubmit={this.submitBtnHandler}
                      action={ROUTES.SIGN_IN} verifiableElements={container}>

                    {email}
                    {password}

                    <button type="submit" className="mainButton">Войти </button>
                    <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value}/>


                </ValidateForm>

            </div>
        )
    }
}


