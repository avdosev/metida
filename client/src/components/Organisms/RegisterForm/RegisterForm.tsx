import React from 'react';
import '../../styles/main.scss';
import '../../styles/input.scss';
import { IProps, IState } from './IRegisterForm';
import { FieldInput } from '../../Atoms/Field/FieldInput';
import * as ROUTES from '../../../config/routes';
import { Redirect } from 'react-router-dom';
import Form from '../../Molecules/Form/Form';
import { initialValidator, Validators } from '../IValidators';
import { loginQuery } from '../../Molecules/Form/FormHelper';
import FieldError from '../../Atoms/FieldError/FieldError';
import { Valid } from '../IAuth';
import { getCurrentUser } from '../../../services/user';
import { ChangeHeaderInterface } from '../../../containers/ChangeHeaderEvent/dispatcher';

export default class RegisterForm extends React.Component<ChangeHeaderInterface, IState> {
    constructor(props: ChangeHeaderInterface) {
        super(props);
        this.state = {
            repassword: { value: '', valid: Valid.Intermediate },
            login: { value: '', valid: Valid.Intermediate },
            email: { value: '', valid: Valid.Intermediate },
            password: { value: '', valid: Valid.Intermediate },
            referrer: <></>,
            serverError: { value: '', valid: Valid.Intermediate },
            validators: initialValidator,
        };
    }

    onValidatorChange = (validators: Validators) => {
        this.setState({ validators: validators });
    };

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = !!fieldValue.match(this.state.validators![fieldName].regexp);
        if (fieldValid) return Valid.Acceptable;
        else return Valid.Invalid;
    };

    comparePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valid = this.validateField(event.target.name, event.target.value);

        let isPasswordEqual = Valid.Invalid;
        if (event.target.value === this.state.repassword.value) {
            isPasswordEqual = Valid.Acceptable;
        } else {
            isPasswordEqual = Valid.Invalid;
        }

        this.setState({
            repassword: {
                value: this.state.repassword.value,
                valid: isPasswordEqual,
            },
        });
        this.setState({ [event.target.name]: { value: event.target.value, valid: valid } });
    };

    compareRepassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valid =
            this.validateField(event.target.name, event.target.value) &&
            event.target.value === this.state.password.value;
        this.setState({ [event.target.name]: { value: event.target.value, valid: valid } });
    };

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valid = this.validateField(event.target.name, event.target.value);
        this.setState({ [event.target.name]: { value: event.target.value, valid: valid } });
    };

    submitBtnHandler = async (event: React.FormEvent) => {
        let error = await loginQuery(ROUTES.REGISTER, {
            email: this.state.email.value,
            password: this.state.password.value,
            login: this.state.login.value,
        });
        if (error) {
            if (error.match('Cannot POST')) {
                console.warn('Сервер не отвечает');
                error = 'Сервер не отвечает, попробуйте позже.';
            }
            this.setState({ serverError: { value: error, valid: Valid.Invalid } });
        } else {
            const user = getCurrentUser();
            if (!user) throw new Error('После входа, нам не вернулся пользователь, это ужасно');

            this.props.signIn(user);

            this.setState({ referrer: <Redirect to={ROUTES.LANDING} /> });
            console.log(this.state);
        }
    };

    render() {
        const fd = this.state;
        const v = this.state.validators;

        return (
            <div className="inputForm">
                {this.state.referrer}
                <Form
                    onValidatorChange={this.onValidatorChange}
                    onSubmit={this.submitBtnHandler}
                    action={ROUTES.REGISTER}
                >
                    <FieldInput
                        fieldName="email"
                        autofocus
                        regexp={v!.email.regexp}
                        valid={fd.email.valid}
                        validateFunc={this.handleUserInput}
                        value={fd.email.value}
                        text={v!.email.error_str}
                        fieldDescription="Электронная почта"
                    />
                    <FieldInput
                        fieldName="login"
                        regexp={v!.login.regexp}
                        valid={fd.login.valid}
                        fieldDescription="Логин"
                        validateFunc={this.handleUserInput}
                        value={fd.login.value}
                        text={v!.login.error_str}
                    />

                    <FieldInput
                        fieldName="password"
                        regexp={v!.password.regexp}
                        valid={fd.password.valid}
                        fieldDescription="Пароль"
                        validateFunc={this.comparePassword}
                        value={fd.password.value}
                        text={v!.password.error_str}
                    />

                    <FieldInput
                        fieldName="repassword"
                        fieldType="password"
                        regexp={v!.repassword.regexp}
                        valid={fd.repassword.valid}
                        validateFunc={this.compareRepassword}
                        value={fd.repassword.value}
                        text={v!.repassword.error_str}
                        fieldDescription="Повторите пароль"
                    />

                    <FieldError valid={this.state.serverError.valid} text={this.state.serverError.value} />
                    <button type="submit" className="mainButton">
                        Зарегистрироваться
                    </button>
                </Form>
            </div>
        );
    }
}
