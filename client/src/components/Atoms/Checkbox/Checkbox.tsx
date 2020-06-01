import React, {useState} from "react";

interface IProps {
    id: string,
    label: string,

    [field: string]: any
}

interface IState {
    isChecked: boolean
}

export default class Checkbox extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {isChecked: false}
    }

    soldCheckbox = (event: any) => {
        this.setState({isChecked: event.target.checked});
    };

    render() {
        return (<label>
            <input type="checkbox"
                   checked={this.state.isChecked}
                   onClick={this.soldCheckbox}
                   onChange={this.soldCheckbox}
                   {...this.props} />
            {this.props.label}
        </label>)
    }
}

