import React from "react";
import "../../styles/input.scss"
import * as ROUTES from "../../../config/routes";
import FieldInput from "../../Molecules/Field/FieldInput";
import {post} from "../../../services/router";
import Checkbox from "../../Atoms/Checkbox/Checkbox";
import {Redirect} from "react-router-dom";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import {Field, validateField, validators, Validators, ValidatorState, VerifiableField} from "../IValidators";
import FieldTextarea from "../../Molecules/Field/FieldTextarea";
import {IReferable} from "../IRoute";
import ValidateForm from "../ValidableForm/ValidateForm";
import {Container} from "../../../services/validator/container";
import {IntermediateIsValid} from "../../../services/validator/show_error_strategies";


interface IProps {
    onRenderPreview: (header: string, disclaimer: string, content: string) => void
}

interface IState extends IReferable {
    header: VerifiableField,
    content: VerifiableField,
    disclaimer: VerifiableField,
    serverError: Field
    isPreview: boolean,
}

export default class CreateArticleForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            header: new VerifiableField('', validateField(validators.header)),
            disclaimer: new VerifiableField('', validateField(validators.disclaimer)),
            content: new VerifiableField('', validateField(validators.content)),
            isPreview: false,
            referrer: <></>,
            serverError: {value: '', valid: ValidatorState.Intermediate},
        }
    }

    submitBtnHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const response = await post(ROUTES.CREATE_ARTICLE, {
            disclaimer: this.state.disclaimer,
            header: this.state.header,
            content: this.state.content
        });

        if (response.hasOwnProperty('error')) {
            this.setState({serverError: response.error})
        } else {
            if (response.message) { // такой себе, конечно, кусок кода
                this.setState({referrer: <Redirect to={"/post/" + response.message} />})
            } else {
                this.setState({referrer: <Redirect to={ROUTES.LANDING} />})
            }
            // TODO сделать нормальный редирект на статью
        }
    }

    handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {content, header, disclaimer} = this.state
        if (e.target.checked) {
            this.props.onRenderPreview(header.value, disclaimer.value, content.value)
        }
        else {
            this.props.onRenderPreview("", "", "")
        }
        this.setState({isPreview: e.target.checked})
    }


    render() {
        const fd = this.state
        const v: Validators = validators

        const container = new Container(this.state.header, this.state.disclaimer, this.state.content);

        return <ValidateForm className="pushArticle" action={ROUTES.CREATE_ARTICLE} method="post"
                     onSubmit={this.submitBtnHandler} verifiableElements={container} >
            {this.state.referrer}
            <FieldInput
                fieldDescription={ "Заголовок"}
                regexp={ v.header.regexp}
                value={ fd.header.value}
                fieldType={ "text"}
                fieldName={ "header"}
                placeholder={ "Заголовок должен передавать основной смысл публикации."}
                errorText={ v.header.error_str}
                autofocus={ true}
                showErrorStrategy={ IntermediateIsValid}
                validate={fd.header.validate}
            />
            <FieldTextarea
                fieldDescription={ "Дисклеймер"}
                regexp={ v.disclaimer.regexp}
                value={ fd.disclaimer.value}
                fieldType={ "text"}
                fieldName={ "disclaimer"}
                placeholder={ "Здесь приводится краткое описание статьи."}
                errorText={ v.disclaimer.error_str}
                showErrorStrategy={ IntermediateIsValid}
                validate={fd.disclaimer.validate}
            />
            <Checkbox id="previews" label="Предпросмотр" checked={this.state.isPreview} onClick={this.handleCheckboxChange} />

            <FieldTextarea
                fieldId={"article"}
                fieldClass={ "create_area"}
                fieldDescription={"Текст"}
                regexp={v.content.regexp}
                value={fd.content.value}
                fieldType={ "text"}
                fieldName={ "content"}
                placeholder={ "Текст вашей статьи..."}
                errorText={ v.content.error_str}
                showErrorStrategy={ IntermediateIsValid}
                validate={ fd.disclaimer.validate}
            />

            <button type="submit" className="mainButton">Отправить </button>
            <ErrorPlaceholder valid={this.state.serverError.valid} value={this.state.serverError.value}/>

        </ValidateForm>;
    }
}