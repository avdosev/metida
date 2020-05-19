import React from "react";

interface IState {

}

interface IProps {
    fieldName: string,
    validateFunc: (event: any) => void,
    regexp: string,
    value: string,

    fieldType?: string,
    fieldDescription?: string,
    placeholder?: string,
}

export default class Input extends React.Component<IProps, IState> {


    render() {
        return <>
            <p>{this.props.fieldDescription ? this.props.fieldDescription : this.props.fieldName} </p>
            <input id={this.props.fieldName}
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
