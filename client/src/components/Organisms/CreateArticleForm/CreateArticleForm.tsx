import React from "react";
import * as ROUTES from "../../../config/routes";
import {FieldInput} from "../../Molecules/Field/FieldInput";
import {post} from "../../Router";
import {IProps, IState} from "./ICreateArticleForm";
import Checkbox from "../../Atoms/Checkbox/Checkbox";
import {Redirect} from "react-router-dom";
import {loginQuery} from "../Form/FormHelper";
import FieldError from "../../Atoms/FieldError/FieldError";
import Form from "../Form/Form";
import {initialValidator, Validators} from "../IValidators";
import {FieldTextarea} from "../../Molecules/Field/FieldTextarea";


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
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }

    submitBtnHandler = async (event: any) => {
        event.preventDefault()
        const error = await post(ROUTES.CREATE_ARTICLE, {
            disclaimer: this.state.disclaimer.value,
            header: this.state.header.value,
            art: this.state.content.value} // мм art
        );

        console.log(error)
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

            <FieldInput valid={fd.header.valid}
                        fieldDescription="Заголовок"
                        validateFunc={this.handleUserInput}
                        regexp={v.header.regexp}
                        value={fd.header.value}
                        fieldType="text"
                        fieldName="header"
                        placeholder="Заголовок должен передавать основной смысл публикации."
                        text={v.header.error_str}
            />

            <FieldTextarea valid={fd.disclaimer.valid}
                        fieldDescription="Дисклеймер"
                        validateFunc={this.handleUserInput}
                        regexp={v.disclaimer.regexp}
                        value={fd.disclaimer.value}
                        fieldType="text"
                        fieldName="disclaimer"
                        placeholder="Здесь приводится краткое описание статьи."
                        text={v.disclaimer.error_str}
            />

            <Checkbox id="previews" label="Предпросмотр" checked={this.state.preview} onChange={this.handleCheckboxChange} />

            <FieldTextarea valid={fd.content.valid}
                           fieldDescription="Текст"
                           validateFunc={this.handleUserInput}
                           regexp={v.content.regexp}
                           value={fd.content.value}
                           fieldType="text"
                           fieldName="content"
                           placeholder="Текст вашей статьи..."
                           text={v.content.error_str}
            />
            <FieldError valid={!this.state.serverError}  text={this.state.serverError}/>

        </Form>;
    }
}
