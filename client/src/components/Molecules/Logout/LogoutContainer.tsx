import {bindActionCreators} from "redux";
import {setAuth} from "../../../store/actions";
import {connect} from "react-redux";
import React from "react";
import Logout from "./Logout";
import {validateSourceMapOncePerProject} from "ts-loader/dist/utils";


function LogoutContainer(props: any) {
    return (<Logout {...props} />)
}


const mapStateToProps = (state: any) => {
    console.log(state)
    return {
        user: state.user,
    }
}


const mapDispatchToProps = {
    setAuth
}


export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer)
