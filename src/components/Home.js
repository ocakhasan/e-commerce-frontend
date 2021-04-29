import React from "react";
import { useHistory } from "react-router-dom";
import Products from "./Products"
import './styles/home.css'

const Home = () => {

    const history = useHistory()

    
    return (
        <div>
            <div className="home">
                <div className="home-header">
                    <h1>Shop from the Best</h1>
                    <h2>Explore hundreds of products within seconds with perfect user experience</h2>
                    <button className="home-button" onClick={() => history.push("/products")}>Explore</button>

                </div>
                <img src={process.env.PUBLIC_URL + '/basketball.jpg'} alt="product" className="home-img"></img>
            </div>
            <Products />
        </div>

        
    )
}

export default Home