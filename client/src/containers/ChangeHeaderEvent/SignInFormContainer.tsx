import { connect } from 'react-redux';
import Sign_InForm from '../../components/Organisms/Sign_InForm/Sign_InForm';
import React from 'react';
import { mapDispatchToProps, signInAction } from './dispatcher';

function SignInFormContainer(props: any) {
    return <Sign_InForm {...props} />;
}

export default connect(signInAction, mapDispatchToProps)(SignInFormContainer);
