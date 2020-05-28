import React from "react";
import {IField} from "../IField";

interface IState {

}

interface IProps extends IField {

}

export default class Input extends React.Component<IProps, IState> {


    render() {
        return <>
            <h3>{this.props.fieldDescription ? this.props.fieldDescription : this.props.fieldName} </h3>
            <input
                id={this.props.fieldId ? this.props.fieldId : this.props.fieldName}
                className={this.props.fieldClass ? this.props.fieldClass : this.props.fieldName}
                type={this.props.fieldType ? this.props.fieldType : this.props.fieldName}
                name={this.props.fieldName}
                placeholder={this.props.placeholder ? this.props.placeholder : this.props.fieldName}
                required
                pattern={this.props.regexp}
                onChange={this.props.validateFunc}
                value={this.props.value}
            />

        </>;
    }
}
