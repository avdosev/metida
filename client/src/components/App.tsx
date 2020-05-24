import React from 'react';

import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Index from "./Pages/Index/Index"
import * as ROUTES from '../config/routes';
import SignIn from "./Pages/Sign_In/Sign_In";
import Register from "./Pages/Register/Register";
import PostPage from "./Pages/Post/PostPage";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import CreateArticle from "./Pages/CreateArticle/CreateArticle";
import Logout from "./Molecules/Logout/Logout";
import PrivateRoute from "./Molecules/PrivateRoute/PrivateRoute";
import {isAuth} from "./Router";



function App() {
    return (
        <Router>
            <React.StrictMode>
                <Switch>
                    <Route path={ROUTES.CREATE_ARTICLE} component={CreateArticle} />
                    <Route path={ROUTES.LOGOUT} component={Logout} />

                    <PrivateRoute isAuth={isAuth} path={ROUTES.HOME} component={Home} />
                    <PrivateRoute isAuth={isAuth} path={ROUTES.PROFILE} component={Profile}/>
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
