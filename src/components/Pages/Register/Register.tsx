import React from "react";
import RegisterForm from "../../Organisms/RegisterForm/RegisterForm";
import SimplePage from "../../Templates/SimplePage";
import Header from "../../Molecules/Header/Header";

export default function Register() {
    return (<SimplePage header={<Header />} content={<RegisterForm />} />)

}