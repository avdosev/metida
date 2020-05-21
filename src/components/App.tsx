import React from 'react';

import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Header from "./Molecules/Header/Header";
import Index from "./Pages/Index/Index"
import * as ROUTES from '../config/routes';
import SignIn from "./Pages/Sign_In/Sign_In";
import Register from "./Pages/Register/Register";
import PostPage from "./Pages/Post/PostPage";


function App() {
    return (
        <Router>
            <React.StrictMode>
                <Switch>
                    <Route path={ROUTES.POST} component={PostPage}/>
                    <Route path={ROUTES.SIGN_IN} component={SignIn}/>
                    <Route path={ROUTES.REGISTER} component={Register}/>
                    <Route path={ROUTES.LANDING} component={Index}/>
                </Switch>
            </React.StrictMode>
        </Router>
    );
}

export default App;
