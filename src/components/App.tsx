import React from 'react';

import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Header from "./Molecules/Header/Header";
import Index from "./Pages/Index/Index"
import Sign_InForm from "./Organisms/Sign_InForm/Sign_InForm";
import RegisterForm from "./Organisms/RegisterForm/RegisterForm";
import Post from "./Pages/Post/Post";


function App() {
    return (
        <Router>
            <Header/>
            <Switch>

                <Route path="/post/:id" component={Post}/>
                <Route path="/sign_In" component={Sign_InForm}/>
                <Route path="/register" component={RegisterForm} />
                <Route path="/" component={Index} />
            </Switch>
        </Router>
    );
}

export default App;
