import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import { Route, Switch } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import SignUpForm from "./components/SignupForm";
import data from "./components/product_data"
import Products from './components/Products'


function App() {

    
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route path="/login">
                        < LoginForm/>
                    </Route>

                    <Route path="/signup">
                        <SignUpForm />
                    </Route>


                    <Route path="/about">
                        <Home />
                    </Route>

                    <Route path="/product/:id">
                        <LoginForm />
                    </Route>

                    <Route path="/products">
                        <Products data={data}/>
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
