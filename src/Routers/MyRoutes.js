import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/login";
import Dashboard from "../Components/Dashboard/Dashboard";
import Landing from "../Components/Landing/Landing";

const MyRouters = props => {
    return (
        <Switch>
            <Route exact path="/" component={ Landing } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route render ={() => <h1>404 NOT FOUND</h1>}/>
        </Switch>
    );
}

export default MyRouters;
