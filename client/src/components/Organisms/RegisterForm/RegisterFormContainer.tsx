import {bindActionCreators} from "redux";
import { setAuth} from "../../../store/actions";
import {connect} from "react-redux";
import React from "react";
import RegisterForm from "./RegisterForm";

function RegisterFormContainer(props: any) {
    return (<RegisterForm {...props} />)
}


export function putStateToProps(state: any) {
    console.log(state)
    return {user: state.user}
}

const mapDispatchToProps = {
    setAuth
}



export default connect(putStateToProps, mapDispatchToProps)(RegisterFormContainer)