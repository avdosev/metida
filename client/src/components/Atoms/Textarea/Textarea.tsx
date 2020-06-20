import React from "react";
import {ITextInput} from "../ITextField"

interface IState {

}

interface IProps extends ITextInput {

}

export default class Textarea extends React.Component<IProps, IState> {

    render() {
        return <>
            <textarea
                className={this.props.fieldClass ?? this.props.fieldName}
                id={this.props.fieldId ?? this.props.fieldName}
                name={this.props.fieldName}
                placeholder={this.props.placeholder ?? this.props.fieldName}
                required
                onChange={this.props.onChange}
                value={this.props.value}
            />

        </>;
    }
}
