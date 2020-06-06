import React from "react";
import Sign_InForm from "../../Organisms/Sign_InForm/Sign_InForm";
import SimplePage from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";


export default function SignIn() {
    document.title = "Sign in";

    return (<SimplePage  content={<Sign_InForm />} />)

}