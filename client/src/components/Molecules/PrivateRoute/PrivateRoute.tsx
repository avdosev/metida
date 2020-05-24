import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from "../../../config/routes"
import {IRoute} from "../../Organisms/IRoute";


export class PrivateRoute extends React.Component<IRoute, any>{
    redirectPath = ROUTES.SIGN_IN;

    constructor(props: IRoute) {
        super(props);
        this.state = {
            auth: false
        }
        console.log(this.props)
    }

    async componentDidMount() {
        //const auth = await this.props.auth()
        // console.log(auth)
        // this.setState({auth: auth})
    }

    render() {
        console.log(this.state.auth)
        if (!this.state.auth) {
            const renderComponent = () => <Redirect to={this.redirectPath} />;
            return <Route {...this.props} component={renderComponent} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }
}


export default PrivateRoute