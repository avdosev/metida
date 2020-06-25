import React from "react";
import "../../styles/main.scss"
import "../../styles/input.scss"
import FieldInput from "../../Molecules/Field/FieldInput";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom"
import {Field, validators, ValidatorState, VerifiableField, UpdateVerifiableField} from "../IValidators";
import {loginQuery} from "../../../services/FormHelper"
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import {IPublicUser} from "../IPrivateUser";
import {getCurrentUser} from "../../../services/user";
import {ChangeHeaderInterface} from "../../../containers/ChangeHeaderEvent/dispatcher";
import ValidateForm from "../ValidableForm/ValidateForm";
import {Container} from "../../../services/validator/container";
import {IntermediateIsValid} from "../../../services/validator/show_error_strategies";
import {IReferable} from '../IRoute';

interface IProps extends ChangeHeaderInterface {}

interface IState extends IReferable {
    email: VerifiableField,
    password: VerifiableField,
    serverError: Field,
}

export default class Sign_InForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        console.log(props)
        this.state = {
            email: new VerifiableField('', str => ValidatorState.Intermediate),
            password: new VerifiableField('', str => ValidatorState.Intermediate),
            referrer: null,
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
        const state = this.state
        const v = validators

        const container = new Container(state.email, state.password);

        return (
            <div className="inputForm">
                {this.state.referrer}
                <ValidateForm onSubmit={this.submitBtnHandler}
                      action={ROUTES.SIGN_IN} verifiableElements={container}>

                    <FieldInput fieldName={"email"}
                                regexp={v!.email.regexp}
                                autofocus
                                value={state.email.value}
                                errorText={v!.email.error_str}
                                showErrorStrategy={IntermediateIsValid}
                                validate={state.email.validator}
                                onChange={UpdateVerifiableField(this, "email")}
                    />

                    <FieldInput fieldName={"password"}
                                regexp={v!.password.regexp}
                                value={state.password.value}
                                errorText={v!.password.error_str}
                                showErrorStrategy={IntermediateIsValid}
                                validate={state.password.validator}
                                onChange={UpdateVerifiableField(this, "password")}
                    />

                    <button type="submit" className="mainButton">Войти </button>
                    <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value}/>
                </ValidateForm>
            </div>
        )
    }
}