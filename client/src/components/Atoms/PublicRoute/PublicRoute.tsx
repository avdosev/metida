import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface IRoute extends RouteProps {
    // isChangeHeader
}

export default function PublicRoute(props: IRoute) {
    return <Route {...props} />;
}
