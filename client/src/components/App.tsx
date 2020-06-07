import React, {lazy, Suspense} from 'react';
import {isAuth} from "../services/user";

import * as ROUTES from '../config/routes';
import {BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import PrivateRoute from "./Molecules/PrivateRoute/PrivateRoute";
import Header from "./Molecules/Header/Header";
import Logout from "./Molecules/Logout/Logout";
import BubbleLoader from "./Molecules/BubbleLoader/BubbleLoader";
import PublicRoute from "./Molecules/PublicRoute/PublicRoute";

const PostPage = lazy(() => import("./Pages/Post/PostPage"))
const Index = lazy(() => import("./Pages/Index/Index"))
const ProfilePage = lazy(() => import("./Pages/Profile/ProfilePage"))
const Home = lazy(() => import("./Pages/Home/Home"))
const CreateArticle = lazy(() => import("./Pages/CreateArticle/CreateArticle"))
const SignIn = lazy(() => import("./Pages/Sign_In/Sign_In"))
const Register = lazy(() => import("./Pages/Register/Register"))

function App() {
    return (
        <Router>
            <React.StrictMode>
                {/*не обновляется хедер при изменении страницы. исправить*/}
                <Header url="fsa"/>
                <Suspense fallback={<BubbleLoader/>}>
                    <Switch>
                        <PublicRoute path={ROUTES.LOGOUT} component={Logout}/>
                        <PrivateRoute isAuth={isAuth} path={ROUTES.CREATE_ARTICLE} component={CreateArticle}/>
                        <PrivateRoute isAuth={isAuth} path={ROUTES.HOME} component={Home}/>
                        <PublicRoute path={ROUTES.PROFILE} component={ProfilePage}/>
                        <PublicRoute path={ROUTES.POST} component={PostPage}/>
                        <PublicRoute path={ROUTES.SIGN_IN} component={SignIn}/>
                        <PublicRoute path={ROUTES.REGISTER} component={Register}/>
                        <PublicRoute path={ROUTES.LANDING} component={Index}/>
                    </Switch>
                </Suspense>

            </React.StrictMode>
        </Router>
    );
}


export default App;
