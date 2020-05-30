import React from "react";
import {Validators} from "../IValidators";

interface IState {

}

interface IProps {
    className?: string
    action: string
    method?: string
    onSubmit: (event: any) => void
    onValidatorChange: (validators: Validators) => void
    buttonName: string
}


export default class Form extends React.Component<IProps, IState> {
    errorHandler = () => {
    }

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
        return <form
            className={this.props.className ? this.props.className : "reg"}
            onSubmit={this.onSubmit}
            action={this.props.action}
            method={this.props.method ? this.props.method : "post"}
        >
            {this.props.children}
            <input id="submit" type="submit" className="welcome" value={this.props.buttonName} />

        </form>;
    }
}

