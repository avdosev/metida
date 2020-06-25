import React from 'react';
import '../../styles/main.scss';
import '../../styles/input.scss';
import * as ROUTES from '../../../config/routes';
import { Redirect } from 'react-router-dom';
import {
    Field,
    UpdateVerifiableField,
    validateField,
    validators,
    ValidatorState,
    VerifiableField,
} from '../IValidators';
import { loginQuery } from '../../../services/FormHelper';
import ErrorPlaceholder from '../../Atoms/ErrorPlaceholder/ErrorPlaceholder';
import { getCurrentUser } from '../../../services/user';
import { ChangeHeaderInterface } from '../../../containers/ChangeHeaderEvent/dispatcher';
import ValidateForm from '../ValidableForm/ValidateForm';
import { IReferable } from '../IRoute';
import { Container } from '../../../services/validator/container';
import FieldInput from '../../Molecules/Field/FieldInput';
import { IntermediateIsInvalid, IntermediateIsValid } from '../../../services/validator/show_error_strategies';

interface IProps extends ChangeHeaderInterface {}

interface IState extends IReferable {
    login: VerifiableField;
    email: VerifiableField;
    password: VerifiableField;
    repassword: VerifiableField;
    serverError: Field;
}

function comparePasswords(password: string, repassword: string): ValidatorState {
    let isPasswordEqual;
    if (password === repassword) {
        isPasswordEqual = ValidatorState.Acceptable;
    } else if (repassword.length === 0) {
        isPasswordEqual = ValidatorState.Intermediate;
    } else {
        isPasswordEqual = ValidatorState.Invalid;
    }
    return isPasswordEqual;
}

export default class RegisterForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        // это особенность работы класса VerifiableField по другому мне лень
        // @ts-ignore
        this.state = {
            login: new VerifiableField('', validateField(validators.login)),
            email: new VerifiableField('', validateField(validators.email)),
            password: new VerifiableField('', validateField(validators.password)),
            referrer: null,
            serverError: { value: '', valid: ValidatorState.Intermediate },
        };
        Object.assign(this.state, {
            repassword: new VerifiableField('', this.compareRepassword),
        });
    }

    compareRepassword = (str: string): ValidatorState => {
        return comparePasswords(this.state.password.value, str);
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
            this.setState({ serverError: { value: error, valid: ValidatorState.Invalid } });
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
        const v = validators;

        const container = new Container(fd.email, fd.login, fd.password, fd.repassword);

        return (
            <div className="inputForm">
                {this.state.referrer}
                <ValidateForm
                    onSubmit={this.submitBtnHandler}
                    className="reg"
                    action={ROUTES.REGISTER}
                    verifiableElements={container}
                >
                    <FieldInput
                        fieldName="email"
                        autofocus
                        regexp={v!.email.regexp}
                        value={fd.email.value}
                        errorText={v!.email.error_str}
                        fieldDescription="Электронная почта"
                        showErrorStrategy={IntermediateIsValid}
                        onChange={UpdateVerifiableField(this, 'email')}
                        validate={fd.email.validator}
                    />
                    <FieldInput
                        fieldName="login"
                        regexp={v!.login.regexp}
                        fieldDescription="Логин"
                        value={fd.login.value}
                        errorText={v!.login.error_str}
                        showErrorStrategy={IntermediateIsValid}
                        onChange={UpdateVerifiableField(this, 'login')}
                        validate={fd.login.validator}
                    />

                    <FieldInput
                        fieldName="password"
                        regexp={v!.password.regexp}
                        fieldDescription="Пароль"
                        value={fd.password.value}
                        errorText={v!.password.error_str}
                        showErrorStrategy={IntermediateIsValid}
                        onChange={UpdateVerifiableField(this, 'password')}
                        validate={fd.password.validator}
                    />

                    <FieldInput
                        fieldName="repassword"
                        fieldType="password"
                        regexp={v!.repassword.regexp}
                        value={fd.repassword.value}
                        errorText={v!.repassword.error_str}
                        fieldDescription="Повторите пароль"
                        showErrorStrategy={IntermediateIsInvalid}
                        onChange={UpdateVerifiableField(this, 'repassword')}
                        validate={fd.repassword.validator}
                    />

                    <button type="submit" className="mainButton">
                        Зарегистрироваться
                    </button>
                    <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value} />
                </ValidateForm>
            </div>
        );
    }
}
