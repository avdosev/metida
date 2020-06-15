import React from "react";
import RegisterForm from "Containers/ChangeHeaderEvent/RegisterFormContainer";
import SimplePage from "../../Templates/SimpleTemplate";

interface IProps {
}

export default function Register(props: IProps) { //фиктивные пропсы, мы туда не должны ничего передавать, нужные пропсы передаст редукс
    document.title = "Register";

    return (<SimplePage>
        <RegisterForm/>
    </SimplePage>)

}