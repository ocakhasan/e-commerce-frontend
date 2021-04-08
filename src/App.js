import React from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import { Route, Switch } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import SignUpForm from "./components/SignupForm";
import Products from "./components/Products"

function App() {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route path="/login">
                        <LoginForm />
                    </Route>

                    <Route path="/signup">
                        <SignUpForm />
                    </Route>


                    <Route path="/about">
                        <Home />
                    </Route>

                    <Route path="/">
                        <Home />
                    </Route>

                    <Route path="/products">
                        <Products/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
