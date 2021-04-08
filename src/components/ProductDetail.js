import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productService from '../services/productService'
import './styles/productDetail.css'
import Navbar from './Navbar'
import ReactStars from "react-rating-stars-component";

const ProductDetail = () => {
    const params = useParams()
    const [data, setData] = useState()
    const [notification, setNotification] = useState('')

    useEffect(() => {

        console.log(params.id)
        productService
            .getProduct(params.id)
            .then(response => {
                console.log(response.message)
                setData(response.message)
            })
            .catch(_error => setNotification("product idoes not exist"))

    }, [])
    if (data) {
        return (
            <div >
                <Navbar />
                <div className="product_detail">
                    <p>{notification}</p>
                    <div className="detail_image">
                        <img className="image" src={process.env.PUBLIC_URL + "/glass.jpg"} />
                    </div>
                    <div className="details">
                        <div className="details_header">
                            <p className="product_name">{data.name}</p>
                            <small className="product_brand">{data.brand}</small>

                        </div>
                        <div className="details_price">
                            <div className="sale_prices">
                                <div className="sale">
                                    <p>%2</p>
                                    <small>İndirim</small>
                                </div>
                                <div className="prices">
                                    <p className="old_price">3000</p>
                                    <p className="new_price">{data.price} TL</p>
                                </div>

                            </div>
                            <div className="product_rating">
                                <ReactStars
                                    value={data.rating}
                                    count={5}
                                    onChange={() => console.log("kasjfgjsa")}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                

                                <small>200 değerlendirme</small>
                            </div>
                        </div>

                        <div className="product_buy">
                            <form>
                                <button className="buy_button">Add to Cart</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        )

    } else {
        return <h1>Loading</h1>
    }
}

export default ProductDetail