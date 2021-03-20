import React from 'react'
import Form from './components/LoginForm'
import Card from './components/Card'
import { Route, Switch } from 'react-router'
import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom'
import SignUpForm from "./components/SignupForm";


function App() {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route path="/login">
                        <Navbar />
                        <Form />
                    </Route>

                    <Route path="/signup">
                        <Navbar />
                        <SignUpForm />
                    </Route>


                    <Route path="/about">
                        <Navbar />
                        <Card />
                    </Route>

                    <Route path="/">
                        <Navbar />
                        <Card />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
