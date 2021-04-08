import React from "react";
import "./styles/Products.css"
import { Link } from 'react-router-dom'



const MainContent = ({ data }) => {
    console.log("in main content")

    const listitems = data.map((item) => (

        <Link to={"/product/" + item._id} style={{ textDecoration: 'none' }}>
            < div className="card" key={item._id} >
                <div className="card_header">
                    <h2>
                        {item.name}
                    </h2>
                </div>
                <div className="card_image">
                    <img src={item.image} />
                </div>
                <div className="card_detail">

                    <p className="card_price">
                        {item.price}TL
                    </p>
                    <button className="card_button">Add to Cart</button>
                </div>


            </div >
        </Link>
    ));

    console.log("li", listitems)
    return (
        <div>
            <h1 className="header">Products</h1>
            <div className="main_content">
                {listitems}
            </div>

        </div>


    )
}

export default MainContent