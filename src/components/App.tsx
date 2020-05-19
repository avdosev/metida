import React from 'react';

import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Header from "./Molecules/Header/Header";
import Index from "./Pages/Index/Index"
import Sign_InForm from "./Organisms/Sign_InForm/Sign_InForm";
import RegisterForm from "./Organisms/RegisterForm/RegisterForm";
import Post from "./Pages/Post/Post";
import * as ROUTES from '../config/routes';


function App() {
    return (
        <Router>
            <Header/>
            <Switch>

                <Route path={ROUTES.POST} component={Post}/>
                <Route path={ROUTES.SIGN_IN} component={Sign_InForm}/>
                <Route path={ROUTES.REGISTER} component={RegisterForm} />
                <Route path={ROUTES.LANDING} component={Index} />
            </Switch>
        </Router>
    );
}

export default App;
