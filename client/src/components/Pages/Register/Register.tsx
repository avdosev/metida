import React from "react";
import RegisterForm from "../../Organisms/RegisterForm/RegisterForm";
import SimplePage from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/HeaderContainer";

export default function Register() {
    document.title = "Register";

    return (<SimplePage>
        <RegisterForm/>
    </SimplePage>)

}