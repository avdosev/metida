
import React from 'react';
import { connect } from 'react-redux';

import Header from "./Header";


function HeaderContainer(props: any) {
    return (<Header {...props} />)
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password
    }
}

const mapDispatchToProps = {
    setEmail, setPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)