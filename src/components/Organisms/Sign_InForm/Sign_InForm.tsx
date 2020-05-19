import React from "react";
import "../../main.css"
import "../../input.css"
import Form from "../Form/Form";
import {IProps, IState} from  "./ISign_InForm"



export default class Sign_InForm extends React.Component<IProps, IState> {
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
                    "regexp": ".{5,}"
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

