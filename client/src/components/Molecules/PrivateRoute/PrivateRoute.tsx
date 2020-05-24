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
    }

    componentDidMount() {
        //const auth = await this.props.isAuth()
        //console.log(auth)
        this.setState({auth: true})
        //this.setState({auth: auth}, () => console.log(this.state.auth))

    }

    render() {
        console.log(this.state)
        if (!this.state.auth) {
            const renderComponent = () => <Redirect to={this.redirectPath} />;
            return <Route {...this.props} component={renderComponent} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }
}


export default PrivateRoute