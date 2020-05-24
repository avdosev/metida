import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from "../../../config/routes"
import {IRoute} from "../../Organisms/IRoute";


export const PrivateRoute: React.FC<IRoute> = props => {
    const renderComponent = () => <Redirect to={{ pathname: ROUTES.SIGN_IN }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
};

export default PrivateRoute