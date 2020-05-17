import React from 'react';

import {
    BrowserRouter as Router,
} from "react-router-dom";
import Header from "./Header/Header";
import Index from "./Pages/Index/Index"

function App() {
    return (
        <Router>
            <Header />
            <Index />
        </Router>
    );
}

export default App;
