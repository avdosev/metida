import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React from "react";
import RegisterForm from "../../components/Organisms/RegisterForm/RegisterForm";
import {mapDispatchToProps, signInAction} from "./dispatcher";

function RegisterFormContainer(props: any) {
    console.log(typeof props)
    return (<RegisterForm {...props} />)
}


export default connect(signInAction, mapDispatchToProps)(RegisterFormContainer)