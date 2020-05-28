import React from "react";
import {Validators} from "../IValidators";

interface IState {

}

interface IProps {
    onSubmit: (event: any) => void
    onValidatorChange: (validators: Validators) => void
}


export default class Form extends React.Component<IProps, IState> {
    errorHandler = () => {}

    onSubmit = (event: any) => {
        event.preventDefault()
        this.props.onSubmit(event)
    }

    async componentDidMount() {
        const promise = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promise.json()
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