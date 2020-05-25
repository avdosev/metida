import React from "react";

interface IState {

}

interface IProps {
    onSubmit: () => void
}

export default class Form extends React.Component<IProps, IState> {
    async componentDidMount() {
        const promice = await fetch(process.env.PUBLIC_URL + '/json/input_errors.json')
        const validators = await promice.json()
        this.setState({validators: validators})
    }

    render() {
        return <form className="reg"> {this.props.children} </form>;
    }
}

//TODO убрать отсюда