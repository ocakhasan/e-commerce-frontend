import React, { useState, useEffect } from "react";
import "./styles/Products.css"
import { Link } from 'react-router-dom'
import productService from '../services/productService'



const MainContent = () => {
    console.log("in main content")
    const [data, setData] = useState([])

    useEffect(() => {
        productService
            .getAllProduct()
            .then(response => {
                console.log(response)
                setData(response.products)
            })

    }, [])

    return (
        <div>
            <h1 className="header">Products</h1>
            <div className="main_content">
                {data.map((item) => (

                    <Link to={"/product/" + item._id} style={{ textDecoration: 'none' }}>
                        < div className="card" key={item._id} >
                            <div className="card_header">
                                <h2>
                                    {item.productName}
                                </h2>
                            </div>
                            <div className="card_image">
                                <img src={process.env.PUBLIC_URL + "/glass.jpg"} />
                            </div>
                            <div className="card_detail">

                                <p className="card_price">
                                    {item.unitPrice}TL
                                </p>
                                <button className="card_button">Add to Cart</button>
                            </div>


                        </div >
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MainContent