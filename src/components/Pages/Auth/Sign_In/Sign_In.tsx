import React from "react";
import "../../../main.css"
import "../../../input.css"
import {post} from "../../../Router"
import FormError from "../../../Atoms/FormError/FormError";
import Form from "../../../Molecules/Form/Form"
import {IIState} from "../IAuth";
import {Validators} from "../IValidators";


interface FieldDescription {
    regexp: string,
    EventError: string,
    error_str: string
}

interface AbsFD {
    [fieldName: string]: FieldDescription //это значит, любое количество стринговых полей
}

interface IProps {
}

interface IState extends IIState {
    validators?: Validators;
    fieldDescription: AbsFD

}

export default class Sign_In extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            fieldDescription: {
                "email": {
                    "error_str": "Проверьте правильность введенного e-mail",
                    "EventError": "Вводи почту правильно",
                    "regexp": ".+@.+\\..+"
                },
                "password": {
                    "error_str": "Пароль должен содержать более 5 символов",
                    "EventError": "EventErrorPassword",
                    "regexp": ".{88,}"
                }
            },
            validators: undefined}
    }

    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.setState({validators: validators})

        this.setState({
            fieldDescription: {
                'email': validators.email,
                'password': validators.password,
            }
        })
        console.log(this.state)
    }

    render() {
        return (
            <div className="inputForm">
                <Form fieldDescription={this.state.fieldDescription} />
            </div>

        )
    }
}

