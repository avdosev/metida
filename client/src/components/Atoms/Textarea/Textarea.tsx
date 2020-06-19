import React from "react";
import {ITextField} from "../ITextField"

interface IState {

}

interface IProps extends ITextField {

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
                onChange={this.props.validateFunc}
                value={this.props.value}
            />

        </>;
    }
}
