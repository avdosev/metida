import React from 'react';
import 'Styles/main.scss';
import 'Styles/input.scss';
import * as ROUTES from '../../../config/routes';
import {
    Field,
    UpdateVerifiableField,
    validateField,
    validators,
    ValidatorState,
    VerifiableField,
} from '../IValidators';
import { curry } from '@typed/curry';
import { loginQuery, postLogin } from 'Services/FormHelper';
import { ChangeHeaderInterface } from 'Containers/ChangeHeaderEvent/dispatcher';
import ValidateForm from '../ValidableForm/ValidateForm';
import { IReferable } from '../IRoute';
import { Container } from 'Services/validator/container';
import { IntermediateIsValid } from 'Services/validator/show_error_strategies';
import { composeAsync } from 'Services/functional';
import {FieldInput, ErrorPlaceholder, FormButton} from 'Components';

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
        const allFields = {
            email: this.state.email.value,
            password: this.state.password.value,
            login: this.state.login.value,
        };
        const sendDataToServer = curry(loginQuery)(ROUTES.REGISTER);
        const getResponse = curry(postLogin)(this.props.signIn);

        const conveyor = composeAsync(getResponse, sendDataToServer);

        const res = await conveyor(allFields);
        this.setState({ ...res });
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
                        regexp={v.email.regexp}
                        value={fd.email.value}
                        errorText={v.email.error_str}
                        fieldDescription="Электронная почта"
                        showErrorStrategy={IntermediateIsValid}
                        onChange={UpdateVerifiableField(this, 'email')}
                        validate={fd.email.validator}
                    />
                    <FieldInput
                        fieldName="login"
                        regexp={v.login.regexp}
                        fieldDescription="Логин"
                        value={fd.login.value}
                        errorText={v.login.error_str}
                        showErrorStrategy={IntermediateIsValid}
                        onChange={UpdateVerifiableField(this, 'login')}
                        validate={fd.login.validator}
                    />

                    <FieldInput
                        fieldName="password"
                        regexp={v.password.regexp}
                        fieldDescription="Пароль"
                        value={fd.password.value}
                        errorText={v.password.error_str}
                        showErrorStrategy={IntermediateIsValid}
                        onChange={UpdateVerifiableField(this, 'password')}
                        validate={fd.password.validator}
                    />

                    <FieldInput
                        fieldName="repassword"
                        fieldType="password"
                        regexp={v.repassword.regexp}
                        value={fd.repassword.value}
                        errorText={v.repassword.error_str}
                        fieldDescription="Повторите пароль"
                        showErrorStrategy={IntermediateIsValid}
                        onChange={UpdateVerifiableField(this, 'repassword')}
                        validate={fd.repassword.validator}
                    />

                    <FormButton text="Зарегистрироваться" />
                    <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value} />
                </ValidateForm>
            </div>
        );
    }
}
