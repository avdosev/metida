import ValidateForm from "../../Organisms/ValidableForm/ValidateForm";
import React from "react";

type MouseClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

interface CustomButton {
    onClick: MouseClick
}

interface FormButton {
    onClick?: MouseClick
}

interface Button<T> {
    text: string
    type: ButtonType
    onClick?: T extends "submit" ? FormButton[keyof FormButton] : CustomButton[keyof CustomButton]
}

type ButtonType = "submit" | "button"


export default function Button<T extends ButtonType[keyof ButtonType]>({text, type, onClick}: Button<T>) {
    return(<button type={type} className="mainButton" onClick={onClick}>
        {text}
    </button>)
}