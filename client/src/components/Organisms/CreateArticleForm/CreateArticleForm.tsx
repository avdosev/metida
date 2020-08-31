import React from 'react';
import 'Styles/input.scss';
import * as ROUTES from '../../../config/routes';
import { HTTP_method, query } from 'Services/router';
import { Redirect } from 'react-router-dom';
import {
    Field,
    UpdateVerifiableField,
    validateField,
    validators,
    Validators,
    ValidatorState,
    VerifiableField,
} from '../IValidators';
import { IReferable } from '../IRoute';
import ValidateForm from '../ValidableForm/ValidateForm';
import { Container } from 'Services/validator/container';
import { IntermediateIsValid } from 'Services/validator/show_error_strategies';
import { FormButton, FieldTextarea, ErrorPlaceholder, FieldInput, Checkbox } from 'Components';

interface IProps {
    onRenderPreview: (header: string, disclaimer: string, content: string) => void;
    onPreviewChange: (isPreview: boolean) => void;
    headerDefault: string;
    disclaimerDefault: string;
    contentDefault: string;
    requestURL: string;
    method: HTTP_method;
}

interface IState extends IReferable {
    header: VerifiableField;
    content: VerifiableField;
    disclaimer: VerifiableField;
    serverError: Field;
    isPreview: boolean;
}

export default class CreateArticleForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            header: new VerifiableField(props.headerDefault, validateField(validators.header)),
            disclaimer: new VerifiableField(props.disclaimerDefault, validateField(validators.disclaimer)),
            content: new VerifiableField(props.contentDefault, validateField(validators.content)),
            isPreview: false,
            referrer: <></>,
            serverError: { value: '', valid: ValidatorState.Intermediate },
        };
    }

    submitBtnHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await query(this.props.method, this.props.requestURL, {
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

    rerenderPreview = () => {
        console.log('rerender');
        const { content, header, disclaimer } = this.state;
        this.props.onRenderPreview(header.value, disclaimer.value, content.value);
    };

    handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ isPreview: e.target.checked }, () => {
            this.props.onPreviewChange(this.state.isPreview);
        });
    };

    render() {
        const fd = this.state;
        const v: Validators = validators;

        const container = new Container(this.state.header, this.state.disclaimer, this.state.content);

        return (
            <ValidateForm
                className="pushArticle"
                action={ROUTES.CREATE_ARTICLE}
                method="post"
                onSubmit={this.submitBtnHandler}
                verifiableElements={container}
            >
                {this.state.referrer}
                <FieldInput
                    fieldDescription={'Заголовок'}
                    regexp={v.header.regexp}
                    value={fd.header.value}
                    fieldType={'text'}
                    fieldName={'header'}
                    placeholder={'Заголовок должен передавать основной смысл публикации.'}
                    errorText={v.header.error_str}
                    autofocus
                    showErrorStrategy={IntermediateIsValid}
                    validate={fd.header.validator}
                    onChange={UpdateVerifiableField(this, 'header', this.rerenderPreview)}
                />
                <FieldTextarea
                    fieldClass="create_area"
                    fieldDescription={'Дисклеймер'}
                    regexp={v.disclaimer.regexp}
                    value={fd.disclaimer.value}
                    fieldType={'text'}
                    fieldName={'disclaimer'}
                    placeholder={'Здесь приводится краткое описание статьи.'}
                    errorText={v.disclaimer.error_str}
                    showErrorStrategy={IntermediateIsValid}
                    validate={fd.disclaimer.validator}
                    onChange={UpdateVerifiableField(this, 'disclaimer', this.rerenderPreview)}
                />
                <Checkbox
                    id="previews"
                    label="Предпросмотр"
                    checked={this.state.isPreview}
                    onClick={this.handleCheckboxChange}
                />

                <FieldTextarea
                    fieldId={'article'}
                    fieldClass={'create_area'}
                    fieldDescription={'Текст'}
                    regexp={v.content.regexp}
                    value={fd.content.value}
                    fieldType={'text'}
                    fieldName={'content'}
                    placeholder={'Текст вашей статьи...'}
                    errorText={v.content.error_str}
                    showErrorStrategy={IntermediateIsValid}
                    validate={fd.disclaimer.validator}
                    onChange={UpdateVerifiableField(this, 'content', this.rerenderPreview)}
                />
                <FormButton text="Отправить" />
                <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value} />
            </ValidateForm>
        );
    }
}
