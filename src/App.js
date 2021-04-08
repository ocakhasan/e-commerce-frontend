import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import SignUpForm from "./components/SignupForm";
import ProductDetail from './components/ProductDetail'
import Products from './components/Products'
import data from './components/product_data'
import Navbar from './components/Navbar'
function App() {


    return (
        <Router>
            <div className="container">
                <Navbar />
                <Switch>
                    <Route path="/login">
                        < LoginForm />
                    </Route>

                    <Route path="/signup">
                        <SignUpForm />
                    </Route>


                    <Route path="/about">
                        <Home />
                    </Route>

                    <Route path="/product/:id">
                        <ProductDetail />
                    </Route>

                    <Route path="/products">
                        <Products data={data} />
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
