import React from "react";
import {IField} from "../IField";

interface IState {

}

interface IProps extends IField {

}

export default class Textarea extends React.Component<IProps, IState> {

    render() {
        return <>
            <p>{this.props.fieldDescription ? this.props.fieldDescription : this.props.fieldName} </p>
            <textarea
                className={this.props.fieldClass ? this.props.fieldClass : this.props.fieldName}
                id={this.props.fieldId ? this.props.fieldId : this.props.fieldName}
                name={this.props.fieldName}
                placeholder={this.props.placeholder ? this.props.placeholder : this.props.fieldName}
                required
                onChange={this.props.validateFunc}
                value={this.props.value}
            />

        </>;
    }
}
