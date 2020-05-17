import React from 'react';

import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Header from "./Header/Header";
import Index from "./Pages/Index/Index"
import Sign_In from "./Pages/Auth/Sign_In/Sign_In";
import Register from "./Pages/Auth/Register/Register";


function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/sign_In">
                    <Sign_In />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/">
                    <Index />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
