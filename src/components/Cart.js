import React, { useState, useEffect } from 'react'
import cartService from '../services/cartService'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Cart = () => {

    const [user, setUser] = useState(null)
    const [data, setData] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const logged = window.localStorage.getItem("logged")
        if (logged) {
            console.log("I am logged", logged)
            setUser(true)
            cartService
                .getCartProducts()
                .then(response => {
                    if (response.status) {
                        setData(response.cart)
                    } 
                })
            
        } else {
            setUser(false)
            const cart_without_user = window.localStorage.getItem("cart_without_login")
            console.log(cart_without_user)
            if (cart_without_user) {
                cartService
                    .getProductWithoutUser(cart_without_user)
                    .then(response => {
                        
                        if (response.status) {
                            setData(response.cart)
                        }
                    }).catch(error => {
                        console.log(error)
                    })
            }
            else {
                
                setNotification("There is no product")
                setTimeout(() => setNotification(null), 3000)
            }
        }
    }, [])

    const ToShow = () => {
        if (user) {
            return (
                /* {data.map(product => (
                    <div>{product.productName}</div>
                ))}  */
                <div>
                    <p>Loggged in user with Cart</p>
                    {data.map(product => (
                        <p>{product._id}</p>
                    ))}
                </div>

            )
        } else {
            if (data) {
                return (
                    <div>
                        <p>Logged without user cart</p>
                        {data.map(product => (
                            <p>{product._id}</p>
                        ))}
                    </div>
                )
            }
            return (
                <p>There is no item in the cart</p>
            )
        }
    }

    return (
        <div>
            <ToShow />
        </div>
    )
}

export default Cart