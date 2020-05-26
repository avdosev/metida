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


export default class CreateArticleForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            header: {value: '', valid: false},
            disclaimer: {value: '', valid: false},
            content: {value: '', valid: false},
            previews: false,
            referrer: <></>,
            validators: {
                header: {error_str: '', regexp: '', EventError: ['']},
                content: {error_str: '', regexp: '', EventError: ['']},
                diclaimer: {error_str: '', regexp: '', EventError: ['']}
            }
        }
    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
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


    render() {
        const fd = this.state
        const v = this.state.validators

        return <form className="pushArticle" action={ROUTES.CREATE_ARTICLE} method="post"
                     onSubmit={this.submitBtnHandler}>
            {this.state.referrer}
            <Field valid={fd.header.valid}
                   fieldDescription="Заголовок"
                   validateFunc={this.handleUserInput}
                   regexp={v.header.error_str}
                   value={fd.header.value}
                   fieldType="text"
                   fieldName="headerInput"
                   placeholder="Заголовок должен передавать основной смысл публикации."
            />

            <Field valid={fd.header.valid}
                   fieldDescription="Заголовок"
                   validateFunc={this.handleUserInput}
                   regexp={v.header.error_str}
                   value={fd.header.value}
                   fieldType="text"
                   fieldName="disclaimerInput"
                   placeholder="Здесь приводится краткое описание статьи."
            />
            {/*тут должна быть текстареа, а не инпут*/}

            <Checkbox id="previews" label="Предпросмотр" checked={this.state.preview} onChange={this.handleCheckboxChange} />

            <textarea className="create_area" id="article" placeholder="Текст вашей статьи..."
                      name="art"/>
            <FieldError valid={!this.state.serverError}  text={this.state.serverError}/>

        </form>;
    }
}

//TODO убрать отсюда