import React from "react";
import * as ROUTES from "../../../config/routes";
import Field from "../../Molecules/Field/Field";
import {post} from "../../Router";
import {IProps, IState} from "./ICreateArticleForm";
import Checkbox from "../../Atoms/Checkbox/Checkbox";
import {Redirect} from "react-router-dom";


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



    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.setState({validators: validators})
    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }

    submitBtnHandler = async () => {
        const allValid = this.state.email.valid && this.state.password.valid && this.state.login.valid && this.state.repassword.valid

        if (allValid) {
            console.log("запрос")

            const res = await post(ROUTES.CREATE_ARTICLE, {
                email: this.state.email.value,
                password: this.state.password.value
            })
            this.setState({referrer: <Redirect to={ROUTES.LANDING} />})

        }

    }

    handleCheckboxChange = (e: any) => {
        this.setState({ checked: e.target.checked })
        this.props.onRenderPreview() // async

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
            <span className="contentError" aria-live="polite"/>
            <input type="submit" id="submit" className="Btn"> Отправить</input>
        </form>;
    }
}

//TODO убрать отсюда