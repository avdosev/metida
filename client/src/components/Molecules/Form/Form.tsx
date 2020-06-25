import React from "react";

interface IState {

}

interface IProps {
    className?: string
    action: string
    method?: string
    onSubmit: (event: any) => void
}


export default class Form extends React.Component<IProps, IState> {
    onSubmit = (event: any) => {
        event.preventDefault();
        this.props.onSubmit(event)
    }

    render() {
        return <form
            className={this.props.className}
            onSubmit={this.onSubmit}
            action={this.props.action}
            method={this.props.method ?? "post"}
        >
            {this.props.children}
        </form>;
    }
}