import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";
import Profile from "../src/components/profile";
import history from "./Utils/history";
import PrivateRoute from "./components/PrivateRoute"

function App() {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <Router history={history}>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact />
                    <Route path="/profile" component={Profile} />
                    <PrivateRoute path="/profile" component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;