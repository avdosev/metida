import React from 'react';
import 'Styles/main.scss';
import 'Styles/input.scss';
import * as ROUTES from '../../../config/routes';
import {
    Field,
    validators,
    ValidatorState,
    VerifiableField,
    UpdateVerifiableField,
    validateField,
} from '../IValidators';
import { loginQuery, postLogin } from 'Services/FormHelper';
import { ErrorPlaceholder, FieldInput, FormButton } from 'Components';
import { ChangeHeaderInterface } from 'Containers/ChangeHeaderEvent/dispatcher';
import ValidateForm from '../ValidableForm/ValidateForm';
import { Container } from 'Services/validator/container';
import { IntermediateIsValid } from 'Services/validator/show_error_strategies';
import { IReferable } from '../IRoute';
import { composeAsync } from 'Services/functional';
import { curry } from '@typed/curry';

interface IProps extends ChangeHeaderInterface {}

interface IState extends IReferable {
    email: VerifiableField;
    password: VerifiableField;
    serverError: Field;
}

export default class Sign_InForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            email: new VerifiableField('', validateField(validators.email)),
            password: new VerifiableField('', validateField(validators.password)),
            referrer: null,
            serverError: { value: '', valid: ValidatorState.Intermediate },
        };
    }

    submitBtnHandler = async (event: React.FormEvent) => {
        const allFields = {
            email: this.state.email.value,
            password: this.state.password.value,
        };
        const sendDataToServer = curry(loginQuery)(ROUTES.SIGN_IN);
        const getResponse = curry(postLogin)(this.props.signIn);

        const conveyor = composeAsync(getResponse, sendDataToServer);

        const res = await conveyor(allFields);

        this.setState({ ...res });
    };

    render() {
        const state = this.state;
        const v = validators;

        const container = new Container(state.email, state.password);

        return (
            <div className="inputForm">
                {this.state.referrer}
                <ValidateForm
                    onSubmit={this.submitBtnHandler}
                    className={'reg'}
                    action={ROUTES.SIGN_IN}
                    verifiableElements={container}
                >
                    <FieldInput
                        fieldName={'email'}
                        regexp={v.email.regexp}
                        autofocus
                        value={state.email.value}
                        errorText={v.email.error_str}
                        showErrorStrategy={IntermediateIsValid}
                        validate={state.email.validator}
                        onChange={UpdateVerifiableField(this, 'email')}
                    />

                    <FieldInput
                        fieldName={'password'}
                        regexp={v.password.regexp}
                        value={state.password.value}
                        errorText={v.password.error_str}
                        showErrorStrategy={IntermediateIsValid}
                        validate={state.password.validator}
                        onChange={UpdateVerifiableField(this, 'password')}
                    />

                    <FormButton text="Войти" />
                    <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value} />
                </ValidateForm>
            </div>
        );
    }
}
