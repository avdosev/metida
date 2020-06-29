import React from 'react';
import { Form } from 'Components';
import { VerifiableContainer } from 'Services/validator/container';

interface IProps {
    className?: string;
    action: string;
    method?: string;
    onSubmit: (event: React.MouseEvent) => void;
    verifiableElements: VerifiableContainer;
}

export default class ValidateForm extends React.Component<IProps> {
    onSubmit = (event: any) => {
        if (!this.props.verifiableElements.allValid()) {
            this.props.verifiableElements.verifyElements();
            return;
        }
        this.props.onSubmit(event);
    };

    render() {
        return (
            <Form
                className={this.props.className}
                onSubmit={this.onSubmit}
                action={this.props.action}
                method={this.props.method ?? 'post'}
            >
                {this.props.children}
            </Form>
        );
    }
}
