import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/misc/nav";
import Home from "./components/home/home";

function Router() {
    return (
    
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">login</Route>
                <Route exact path="/signup">signup</Route>
            </Switch>
        </BrowserRouter>
    
    );
}

export default Router;