import React from "react";
import Sign_InForm from "../../Organisms/Sign_InForm/Sign_InForm";
import SimplePage from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import Footer from "../../Organisms/Footer/Footer";

export default function SignIn() {
    document.title = "Sign in";

    return (<SimplePage header={<Header />} content={<Sign_InForm />} />)

}