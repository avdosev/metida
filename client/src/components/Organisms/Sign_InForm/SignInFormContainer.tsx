import {bindActionCreators} from "redux";
import { setAuth} from "../../../store/actions";
import {connect} from "react-redux";
import Sign_InForm from "./Sign_InForm";
import React from "react";


function SignInFormContainer(props: any) {
    return (<Sign_InForm {...props} />)
}


export function putStateToProps(state: any) {
    console.log(state)
    return {user: state.user}
}

const mapDispatchToProps = {
    setAuth
}



export default connect(putStateToProps, mapDispatchToProps)(SignInFormContainer)