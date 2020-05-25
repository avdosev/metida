import React from "react";
import {Validators} from "../IValidators";

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

    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.props.onValidatorChange(validators)
    }

    render() {
        return <form className="reg"> {this.props.children} </form>;
    }
}

//TODO убрать отсюда