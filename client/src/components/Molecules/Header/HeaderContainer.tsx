import React from 'react'

import {Header} from './Header'
import { connect } from 'react-redux'

class HeaderContainer extends React.Component {
    render() {
        return <Header />
    }
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(HeaderContainer)