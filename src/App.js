import React from 'react'
import Form from './LoginForm'
import Home from './Home'
import { Route, Switch } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import SignUpForm from "./SignupForm";


function App() {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route path="/login">
                        <Form />
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
                </Switch>
            </div>
        </Router>
    );
}

export default App;
