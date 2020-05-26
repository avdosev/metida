import React from "react";
import {Validators} from "../IValidators";
import {post} from "../../Router";
import * as ROUTES from "../../../config/routes";
import {Redirect} from "react-router-dom";
import {IIState} from "../IAuth";

interface IState {

}

interface IProps {
    onSubmit: (event: any) => void
    onValidatorChange: (validators: Validators) => void
}


export default class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

    }

    errorHandler = () => {}

    onSubmit = (event: any) => {
        console.log("Вызов 1")
        event.preventDefault()
        this.props.onSubmit(event)
    }


    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.props.onValidatorChange(validators)
    }

    render() {
        return <form className="reg" onSubmit={this.onSubmit}>
            {this.props.children}
            <button id="submit" type="submit" className="welcome">Войти</button>

        </form>;
    }
}

//TODO убрать отсюда