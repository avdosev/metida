import React, {lazy, Suspense} from 'react';
import {isAuth} from "../services/user";

import * as ROUTES from '../config/routes';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import PrivateRoute from "./Molecules/PrivateRoute/PrivateRoute";
import Header from "Containers/ChangeHeaderEvent/HeaderContainer";
import Logout from "Containers/ChangeHeaderEvent/LogoutContainer";
import BubbleLoader  from './Atoms/BubbleLoader/BubbleLoader';
import PublicRoute from "./Molecules/PublicRoute/PublicRoute";
import Offline from "./Pages/Offline/Offline";
//import {BubbleLoader } from "components"

const PostPage = lazy(() => import("./Pages/Post/PostPage"))
const Index = lazy(() => import("./Pages/Index/Index"))
const ProfilePage = lazy(() => import("./Pages/Profile/ProfilePage"))
const Home = lazy(() => import("./Pages/Home/Home"))
const CreateArticle = lazy(() => import("./Pages/CreateArticle/CreateArticle"))
const SignIn = lazy(() => import("./Pages/Sign_In/Sign_In"))
const Register = lazy(() => import("./Pages/Register/Register"))


export default function App() {
    const isDarkSystemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log("Current system is dark? ", isDarkSystemTheme)

    return (
        <Router>
            <Header />
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
                    <PublicRoute path={ROUTES.OFFLINE} component={Offline}/>

                </Switch>
            </Suspense>
        </Router>
    );
}

