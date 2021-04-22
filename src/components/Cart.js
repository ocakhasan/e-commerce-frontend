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
            setUser(true)
            setData(JSON.parse(logged).cart)
            /* cartService
                .getCartProducts()
                .then(response => {
                    if (response.status) {
                        setData(response.cart)
                        setNotification("Cart Information is Ready!")
                        setTimeout(() => setNotification(null), 3000)
                    } else {
                        setNotification("Cart operation unsuccessfull")
                        setTimeout(() => setNotification(null), 3000)

                    }
                }).catch(_error => {
                    setNotification("Cart operation unsuccessfull")
                    setTimeout(() => setNotification(null), 3000)
                }) */
        } else {
            setUser(false)
            const cart_without_user = window.localStorage.getItem("cart_without_login")
            if (cart_without_user) {
                setData(JSON.parse(cart_without_user))
                setNotification("Cart Information is Ready!")
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
                        <p>{product}</p>
                    ))}
                </div>

            )
        } else {
            if (data) {
                return (
                    <div>
                        <p>Logged without user cart</p>
                        {data.map(product => (
                            <p>{product}</p>
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