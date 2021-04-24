import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import { BrowserRouter as Router, useHistory, Route, Switch } from 'react-router-dom'
import SignUpForm from "./components/SignupForm";
import ProductDetail from './components/ProductDetail'
import Products from './components/Products'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import loginService from './services/loginService'
import UpdateForm from './components/Update'
import productService from './services/productService'
import commentService from './services/commentService'
import cartService from './services/cartService'
import Cart from './components/Cart'


function App() {

    const [user, setUser] = useState(null)
    const history = useHistory()
    
    
    

    useEffect(() => {
        const loggedUserJSON= window.localStorage.getItem('logged')
        if (loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            console.log("user", user)
            console.log("token", user.token)
            productService.setToken(user.token)
            commentService.setToken(user.token)
            cartService.setToken(user.token)

            setUser(user)
        }
    }, [])

    const handleLogin = async (userObject) => {
        try{
            console.log(userObject)
            const response = await loginService.login(userObject)
            window.localStorage.setItem(
                'logged', JSON.stringify(response.user)
            )
            setUser(response.user)
            productService.setToken(response.user.token)
            commentService.setToken(response.user.token)
            cartService.setToken(response.user.token)
            return response.status
            
        } catch(exception) {
            console.log("ex", exception) 
        }
    }

    const handleLogout = () => {
        
        window.localStorage.removeItem('logged')
        setUser(null)
    }



    return (
        <Router>
            <div className="container">
                <Navbar user={user} handleLogout={handleLogout}/>
                <Switch>
                    <Route exact path="/login">
                        < LoginForm handleLogin={handleLogin}/>
                    </Route>

                    <Route exact path="/signup">
                        <SignUpForm />
                    </Route>


                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>

                    <Route exact path="/cart">
                        <Cart />
                    </Route>

                    <Route exact path="/product/:id">
                        <ProductDetail />
                    </Route>

                    <Route exact path="/update/product/:id">
                        <UpdateForm />
                    </Route>

                    <Route exact path="/products">
                        <Products />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
