import {bindActionCreators} from "redux";
import {logout, signIn} from "../../../store/actions";
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

export function putActionsToProps(dispatch: any) { // по идее это какая-то функция
    console.log(dispatch)
    return {
        signIn: bindActionCreators(signIn, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
}



export default connect(putStateToProps, putActionsToProps)(SignInFormContainer)