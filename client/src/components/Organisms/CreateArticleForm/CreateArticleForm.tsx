import React from 'react';
import '../../styles/input.scss';
import * as ROUTES from '../../../config/routes';
import { FieldInput } from '../../Atoms/Field/FieldInput';
import { post } from '../../../services/router';
import { IProps, IState } from './ICreateArticleForm';
import Checkbox from '../../Atoms/Checkbox/Checkbox';
import { Redirect } from 'react-router-dom';
import FieldError from '../../Atoms/FieldError/FieldError';
import Form from '../../Molecules/Form/Form';
import { initialValidator, Validators } from '../IValidators';
import { FieldTextarea } from '../../Atoms/Field/FieldTextarea';
import { Valid } from '../IAuth';

export default class CreateArticleForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            header: { value: '', valid: Valid.Intermediate },
            disclaimer: { value: '', valid: Valid.Intermediate },
            content: { value: '', valid: Valid.Intermediate },
            isPreview: false,
            referrer: <></>,
            serverError: { value: '', valid: Valid.Intermediate },
            validators: initialValidator,
        };
    }

    handleUserInput = (event: React.ChangeEvent<any>) => {
        const valid = this.validateField(event.target.name, event.target.value);
        this.setState({ [event.target.name]: { value: event.target.value, valid: valid } }, () => {
            if (this.state.isPreview) {
                this.props.onRenderPreview(this.state.header.value, this.state.disclaimer.value, this.state.content.value);
            }
        });
    };

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = !!fieldValue.match(this.state.validators![fieldName].regexp);
        if (fieldValid) return Valid.Acceptable;
        else return Valid.Invalid;
    };

    submitBtnHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await post(ROUTES.CREATE_ARTICLE, {
            disclaimer: this.state.disclaimer.value,
            header: this.state.header.value,
            content: this.state.content.value,
        });

        if (response.hasOwnProperty('error')) {
            this.setState({ serverError: response.error });
        } else {
            if (response.message) {
                // такой себе, конечно, кусок кода
                this.setState({ referrer: <Redirect to={'/post/' + response.message} /> });
            } else {
                this.setState({ referrer: <Redirect to={ROUTES.LANDING} /> });
            }
            // TODO сделать нормальный редирект на статью
        }
    };

    handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { content, header, disclaimer } = this.state;
        if (e.target.checked) {
            this.props.onRenderPreview(header.value, disclaimer.value, content.value);
        } else {
            this.props.onRenderPreview('', '', '');
        }
        this.setState({ isPreview: e.target.checked });
    };

    onValidatorChange = (validators: Validators) => {
        this.setState({ validators: validators });
    };

    render() {
        const fd = this.state;
        const v: Validators = this.state.validators;

        return (
            <Form
                className="pushArticle"
                action={ROUTES.CREATE_ARTICLE}
                method="post"
                onSubmit={this.submitBtnHandler}
                onValidatorChange={this.onValidatorChange}
            >
                {this.state.referrer}

                <FieldInput
                    valid={fd.header.valid}
                    fieldDescription="Заголовок"
                    validateFunc={this.handleUserInput}
                    regexp={v.header.regexp}
                    value={fd.header.value}
                    fieldType="text"
                    fieldName="header"
                    placeholder="Заголовок должен передавать основной смысл публикации."
                    text={v.header.error_str}
                    autofocus
                />

                <FieldTextarea
                    valid={fd.disclaimer.valid}
                    fieldDescription="Дисклеймер"
                    validateFunc={this.handleUserInput}
                    regexp={v.disclaimer.regexp}
                    value={fd.disclaimer.value}
                    fieldType="text"
                    fieldName="disclaimer"
                    placeholder="Здесь приводится краткое описание статьи."
                    text={v.disclaimer.error_str}
                />

                <Checkbox id="previews" label="Предпросмотр" checked={this.state.isPreview} onClick={this.handleCheckboxChange} />

                <FieldTextarea
                    valid={fd.content.valid}
                    fieldId="article"
                    fieldClass="create_area"
                    fieldDescription="Текст"
                    validateFunc={this.handleUserInput}
                    regexp={v.content.regexp}
                    value={fd.content.value}
                    fieldType="text"
                    fieldName="content"
                    placeholder="Текст вашей статьи..."
                    text={v.content.error_str}
                />
                <FieldError valid={this.state.serverError.valid} text={this.state.serverError.value} />
                <button type="submit" className="mainButton">
                    Отправить{' '}
                </button>
            </Form>
        );
    }
}
