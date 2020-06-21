import React from "react";
import {Validators} from "../IValidators";
import Form from "../../Molecules/Form/Form";

interface IState {

}

interface IProps {
    className?: string
    action: string
    method?: string
    onSubmit: (event: any) => void
}


export default class ValidateForm extends React.Component<IProps, IState> {
    render() {
        return <Form
            className={this.props.className}
            onSubmit={this.props.onSubmit}
            action={this.props.action}
            method={this.props.method ?? "post"}
        >
            {this.props.children}
        </Form>;
    }
}