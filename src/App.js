import React from 'react'
import Form from './components/LoginForm'
import Card from './components/Card'
import { Route, Switch } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import SignUpForm from "./components/SignupForm";


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
                        <Card />
                    </Route>

                    <Route path="/">
                        <Card />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
