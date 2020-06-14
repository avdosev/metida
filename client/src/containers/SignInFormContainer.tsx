import {bindActionCreators} from "redux";
import { setAuth} from "../store/actions";
import {connect} from "react-redux";
import Sign_InForm from "../components/Organisms/Sign_InForm/Sign_InForm";
import React from "react";


function SignInFormContainer(props: any) {
    console.log(typeof props)
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