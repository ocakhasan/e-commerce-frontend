import React from "react";
import Products from "./Products"
import './styles/home.css'

const Home = () => {

    
    return (
        <div>
            <div className="home">
                <div className="home-header">
                    <h1>Shop from the Best</h1>
                    <h2>Explore hundreds of products within seconds with perfect user experience</h2>
                    <button className="home-button">Explore</button>

                </div>
                <img src={process.env.PUBLIC_URL + '/shop.jpg'} alt="product" className="home-img"></img>
            </div>
            <Products />
        </div>

        
    )
}

export default Home