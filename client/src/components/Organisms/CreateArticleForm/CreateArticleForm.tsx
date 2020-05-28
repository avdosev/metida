import React from "react";
import * as ROUTES from "../../../config/routes";
import Field from "../../Molecules/Field/Field";
import {post} from "../../Router";
import {IProps, IState} from "./ICreateArticleForm";
import Checkbox from "../../Atoms/Checkbox/Checkbox";
import {Redirect} from "react-router-dom";
import {pushToA} from "../Form/FormHelper";
import FieldError from "../../Atoms/FieldError/FieldError";
import Form from "../Form/Form";
import {initialValidator, Validators} from "../IValidators";


export default class CreateArticleForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            header: {value: '', valid: false},
            disclaimer: {value: '', valid: false},
            content: {value: '', valid: false},
            previews: false,
            referrer: <></>,
            validators: initialValidator
        }
    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        console.log(fieldName)
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }

    submitBtnHandler = async (event: any) => {
        const error = await pushToA(event, ROUTES.CREATE_ARTICLE, {email: this.state.email.value, password: this.state.password.value});
        if (error) {
            this.setState({serverError: error})
        }
        else {
            this.setState({referrer: <Redirect to={ROUTES.LANDING} />})
        }
    }

    handleCheckboxChange = (e: any) => {
        this.setState({ checked: e.target.checked })
        this.props.onRenderPreview()
    }

    onValidatorChange = (validators: Validators) => {
        this.setState({validators: validators})
    }


    render() {
        const fd = this.state
        const v: Validators = this.state.validators

        return <Form className="pushArticle" action={ROUTES.CREATE_ARTICLE} method="post"
                     onSubmit={this.submitBtnHandler} onValidatorChange={this.onValidatorChange}>
            {this.state.referrer}

            <Field valid={fd.header.valid}
                   fieldDescription="Заголовок"
                   validateFunc={this.handleUserInput}
                   regexp={v.header.error_str}
                   value={fd.header.value}
                   fieldType="text"
                   fieldName="header"
                   placeholder="Заголовок должен передавать основной смысл публикации."
                   text={v.header.error_str}
            />

            <Field valid={fd.disclaimer.valid}
                   fieldDescription="Заголовок"
                   validateFunc={this.handleUserInput}
                   regexp={v.disclaimer.error_str}
                   value={fd.disclaimer.value}
                   fieldType="text"
                   fieldName="disclaimer"
                   placeholder="Здесь приводится краткое описание статьи."
                   text={v.disclaimer.error_str}
            />
            {/*тут должна быть текстареа, а не инпут*/}

            <Checkbox id="previews" label="Предпросмотр" checked={this.state.preview} onChange={this.handleCheckboxChange} />

            <textarea className="create_area" id="article" placeholder="Текст вашей статьи..."
                      name="art"/>
            <FieldError valid={!this.state.serverError}  text={this.state.serverError}/>

        </Form>;
    }
}
