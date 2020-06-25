import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Logout from '../../components/Molecules/Logout/Logout';
import { mapDispatchToProps, logoutAction } from './dispatcher';

function LogoutContainer(props: any) {
    return <Logout {...props} />;
}

export default connect(logoutAction, mapDispatchToProps)(LogoutContainer);
