import React from 'react';
import './button.scss';

type MouseClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface CustomButton extends Button {
    onClick: MouseClick;
}

interface FormButton extends Button {
    onClick?: MouseClick;
}

interface Button {
    text: string;
    type: ButtonType;
}

type ButtonType = 'submit' | 'button';

function Button({ text, type, onClick = () => undefined }: FormButton | CustomButton) {
    return (
        <button type={type} className="mainButton" onClick={onClick}>
            {text}
        </button>
    );
}

export function FormButton(props: Omit<FormButton, 'type'>) {
    return <Button text={props.text} type="submit" onClick={props.onClick} />;
}

export function CustomButton(props: Omit<CustomButton, 'type'>) {
    return <Button text={props.text} type="button" onClick={props.onClick} />;
}
