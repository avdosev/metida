import React from "react";
import "../../styles/main.scss"
import "../../styles/input.scss"
import {IProps, IState} from "./ISign_InForm"
import {FieldInput} from "../../Molecules/Field/FieldInput";
import * as ROUTES from "../../../config/routes"
import {Redirect} from "react-router-dom"
import Form from "../../Molecules/Form/Form";
import {initialValidator, Validators} from "../IValidators";
import {loginQuery} from "../../Molecules/Form/FormHelper"
import FieldError from "../../Atoms/FieldError/FieldError";
import {Valid} from "../IAuth";
import {initialUser, IPublicUser} from "../IPrivateUser";
import {getCurrentUser} from "../../../services/user";



export default class Sign_InForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        console.log(props)
        this.state = {
            email: {value: '', valid: Valid.Intermediate}, password: {value: '', valid: Valid.Intermediate},
            referrer: <></>,
            serverError: {value: '', valid: Valid.Intermediate},
            validators: initialValidator,
        }
    }

    onValidatorChange = (validators: Validators) => {
        this.setState({validators: validators})
    }

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({serverError: {value: '', valid: Valid.Acceptable}})
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = !!fieldValue.match(this.state.validators![fieldName].regexp)
        if (fieldValid) return Valid.Acceptable
        else return Valid.Invalid
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
            this.setState({serverError: {value: error, valid: Valid.Invalid}})
        } else {
            const user = getCurrentUser()
            if (!user) throw new Error("После входа, нам не вернулся пользователь, это ужасно")

            this.props.setAuth({...user})

            this.setState({referrer: <Redirect to={ROUTES.LANDING}/>})
            console.log(this.state)
            //да, я знаю что такое document.refferer, но в данном случае он не подходит, т.к. перерендер формы он считает за переход на другую страницу
        }
    }

    render() {
        const fd = this.state
        const v = this.state.validators

        return (
            <div className="inputForm">
                {this.state.referrer}
                {this.state.block}
                <Form onValidatorChange={this.onValidatorChange} onSubmit={this.submitBtnHandler}
                      action={ROUTES.SIGN_IN} buttonName="Войти">
                    <FieldInput fieldName="email" regexp={v!.email.regexp} valid={fd.email.valid} autofocus
                                validateFunc={this.handleUserInput} value={fd.email.value}
                                text={v!.email.error_str}/>
                    <FieldInput fieldName="password" regexp={v!.password.regexp} valid={fd.password.valid}
                                validateFunc={this.handleUserInput} value={fd.password.value}
                                text={v!.password.error_str}/>
                    <FieldError valid={this.state.serverError.valid} text={this.state.serverError.value}/>
                </Form>

            </div>
        )
    }
}


