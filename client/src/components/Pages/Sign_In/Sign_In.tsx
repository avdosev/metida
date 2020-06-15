import React from "react";
import Sign_InForm from "../../../containers/ChangeHeaderEvent/SignInFormContainer";
import SimplePage from "../../Templates/SimpleTemplate";

interface IProps {
}

export default function SignIn(props: IProps) {
    document.title = "Sign in";

    return (<SimplePage>
        <Sign_InForm />
    </SimplePage>)

}