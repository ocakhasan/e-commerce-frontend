import React from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import { Route, Switch } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import SignUpForm from "./components/SignupForm";
import ProductDetail from './components/ProductDetail'


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

                    <Route path="/:id">
                        <ProductDetail />
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
