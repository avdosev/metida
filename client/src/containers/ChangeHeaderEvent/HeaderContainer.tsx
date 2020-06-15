import React from 'react'
import {Header} from '../../components/Molecules/Header/Header'
import { connect } from 'react-redux'
import {signInAction} from "./dispatcher";

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

export default connect(signInAction)(HeaderContainer)