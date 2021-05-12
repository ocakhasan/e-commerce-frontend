import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import orderService from '../services/orderService'
import LoopIcon from '@material-ui/icons/Loop';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './styles/profile.css'

const Profile = ({ user, setUser }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLocal, setUserLocal] = useState(false);
    const [orderData, setOrderData] = useState(null)
    const [notification, setNotification] = useState(null)
    const [success, setSuccess] = useState(true)


    const handleNotification = (message, success) => {
        handleNotification(message)
        setSuccess(success);
        setTimeout(() => setNotification(null), 3000);
    }

    useEffect(() => {

        const logged = window.localStorage.getItem("logged");
        async function fetchData(id) {
            try {
                const response = await orderService.getUserOrders(id)
                if (response.status) {
                    setOrderData(response.orders)
                    console.log("profile orders", response.orders)
                } else {
                    handleNotification("Orders are not fetched", false)
                }
            } catch (exception) {
                handleNotification("Orders are not fetched", false)
            }
        }
        if (logged) {
            setProfileData(JSON.parse(logged));
            setLoading(false);
            setUserLocal(true);
            fetchData(JSON.parse(logged)['_id'])

        } else {
            setUserLocal(false);
            setLoading(false);
        }
    }, []);

    function getStatus(id) {
        if (id === 0) {
            return <div className><LoopIcon />Processing</div>
        } else if (id === 1) {
            return <p className="order"><MotorcycleIcon /> In Transit</p>
        } else {
            return <p className="order"><CheckCircleIcon />Delivered</p>
        }
    }

    function getTotalPrice(order) {
        let totalPrice = 0
        console.log("order ", order)
        let i
        for (i = 0; i < order.products.length; i++) {
            /* product = order.products[i]
            console.log("product", product) */
            totalPrice += order.products[i].previousPrice ? order.products[i].previousPrice : order.products[i].unitPrice
        }
        return totalPrice
    }

    if (loading) {
        return (
            <div>
                <Alert severity="infor">Loading Profile Page</Alert>
                <CircularProgress />
            </div>
        );
    } else if (!loading && !userLocal) {
        return (
            <div>
                <Alert severity="info">
                    First you need to login to have a profile page. You can login from{" "}
                    <Link to="/login">here</Link>
                </Alert>
            </div>
        );
    } else if (!loading && !profileData) {
        return <Alert severity="error">There is a problem</Alert>;
    } else {
        return (
            <div className="profile_card">
                <div className="sidebar">
                    <ul>
                        <li>Orders</li>
                    </ul>
                </div>
                <div className="orders">
                    <h2>Orders</h2>
                    {orderData?.reverse().map((order, i) => (
                        <div className="order">
                            <div className="order_info">
                                <h4>Order {i + 1}</h4>
                                <button className="order_refund_button">Refund</button>
                            </div>
                            <div className="order_products">
                                {order.products.map(product => (
                                    <div className="order_product">
                                        <img src={product.imagePath} alt={product.productName} className="order_product_image" />
                                        <div className="order_product_right">
                                            <div className="order_product_info">
                                                <p className="order_product_name">{product.productName}</p>
                                                <p className="order_product_price">{product.previousPrice ? product.previousPrice : product.unitPrice} $</p>
                                                <p className="order_address"><span className="address_span">Address</span>: {order.address}</p>
                                            </div>

                                            <div className="order_product_status">
                                                <p>{getStatus(order.status)}</p>

                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                            <p className="total_price"><span>Total Price</span>{getTotalPrice(order)} $</p>
                        </div>

                    ))}
                </div>
                <div className="profile_info">
                    C
                </div>

            </div>
        );
    }
};

export default Profile;
