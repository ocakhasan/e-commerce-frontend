import React from "react";
import Navbar from "./Navbar";
import Products from "./Products"
import './styles/home.css'
import data from "./product_data"


const Home = () => {
    console.log("in home")
    return (
        <div>
            <Navbar />
            <div className="home">
                <div className="home-header">
                    <h1>Shop from the Best</h1>
                    <h2>Explore hundreds of products within seconds with perfect user experience</h2>
                    <button className="home-button">Explore</button>

                </div>
                <img src={process.env.PUBLIC_URL + '/shop.jpg'} className="home-img"></img>
            </div>
            <Products data = {data}/>
        </div>

        
    )
}

export default Home