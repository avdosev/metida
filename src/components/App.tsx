import React from 'react';

import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Header from "./Molecules/Header/Header";
import Index from "./Pages/Index/Index"
import Post from "./Pages/Post/Post";
import * as ROUTES from '../config/routes';
import SignIn from "./Pages/Sign_In/Sign_In";
import Register from "./Pages/Register/Register";


function App() {
    return (
        <Router>
            <Switch>
                <Route path={ROUTES.POST} component={Post}/>
                <Route path={ROUTES.SIGN_IN} component={SignIn}/>
                <Route path={ROUTES.REGISTER} component={Register} />
                <Route path={ROUTES.LANDING} component={Index} />
            </Switch>
        </Router>
    );
}

export default App;
