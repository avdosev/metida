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
            <Header/>
            <Switch>
                <Route path="/sign_In" component={Sign_In}/>
                <Route path="/register" component={Register} />
                <Route path="/" component={Index} />
            </Switch>
        </Router>
    );
}

export default App;
