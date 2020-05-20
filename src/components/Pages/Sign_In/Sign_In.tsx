import React from "react";
import Sign_InForm from "../../Organisms/Sign_InForm/Sign_InForm";
import SimplePage from "../../Templates/SimplePage";
import Header from "../../Molecules/Header/Header";
import Footer from "../../Organisms/Footer/Footer";

export default function SignIn() {
    return (<SimplePage header={<Header />} content={<Sign_InForm />} />)

}