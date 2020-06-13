import React from 'react'

import {Header} from './Header'
import { connect } from 'react-redux'

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: any) => {
    console.log(state)
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(HeaderContainer)