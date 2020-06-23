import React from 'react';
import '../../styles/main.scss';
import '../../styles/input.scss';
import { IProps, IState } from './ISign_InForm';
import { FieldInput } from '../../Atoms/Field/FieldInput';
import * as ROUTES from '../../../config/routes';
import { Redirect } from 'react-router-dom';
import Form from '../../Molecules/Form/Form';
import { initialValidator, Validators } from '../IValidators';
import { loginQuery, postLogin } from '../../Molecules/Form/FormHelper';
import FieldError from '../../Atoms/FieldError/FieldError';
import { Valid } from '../IAuth';
import { initialUser, IPublicUser } from '../IPrivateUser';
import { getCurrentUser } from '../../../services/user';
import { ChangeHeaderInterface } from '../../../containers/ChangeHeaderEvent/dispatcher';
import { composeAsync, curry } from '../../../services/functional';

export default class Sign_InForm extends React.Component<ChangeHeaderInterface, IState> {
    constructor(props: ChangeHeaderInterface) {
        super(props);
        console.log(props);
        this.state = {
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

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ serverError: { value: '', valid: Valid.Acceptable } });
        const valid = this.validateField(event.target.name, event.target.value);
        this.setState({ [event.target.name]: { value: event.target.value, valid: valid } });
    };

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = !!fieldValue.match(this.state.validators![fieldName].regexp);
        if (fieldValid) return Valid.Acceptable;
        else return Valid.Invalid;
    };

    submitBtnHandler = async (event: React.FormEvent) => {
        const allFields = {
            email: this.state.email.value,
            password: this.state.password.value,
        };
        const sendDataToServer = curry(loginQuery)(ROUTES.SIGN_IN);
        const curryPost = curry(postLogin)(this.props.signIn);

        const conveyor = composeAsync(curryPost, sendDataToServer);

        const res = await conveyor(allFields);
        this.setState({ ...res });
    };

    render() {
        const fd = this.state;
        const v = this.state.validators;

        return (
            <div className="inputForm">
                {this.state.referrer}
                {this.state.block}
                <Form onValidatorChange={this.onValidatorChange} onSubmit={this.submitBtnHandler} action={ROUTES.SIGN_IN}>
                    <FieldInput
                        fieldName="email"
                        regexp={v!.email.regexp}
                        valid={fd.email.valid}
                        autofocus
                        validateFunc={this.handleUserInput}
                        value={fd.email.value}
                        fieldDescription="Электронная почта"
                        text={v!.email.error_str}
                    />
                    <FieldInput
                        fieldName="password"
                        regexp={v!.password.regexp}
                        valid={fd.password.valid}
                        validateFunc={this.handleUserInput}
                        value={fd.password.value}
                        fieldDescription="Пароль"
                        text={v!.password.error_str}
                    />
                    <FieldError valid={this.state.serverError.valid} text={this.state.serverError.value} />

                    <button type="submit" className="mainButton">
                        Войти{' '}
                    </button>
                </Form>
            </div>
        );
    }
}
