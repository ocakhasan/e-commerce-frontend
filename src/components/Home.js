import axios from "axios";
import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import './styles/home.css'
import Product from './Product'

const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("/api/product")
            .then(response => {
                console.log(response)
                setData(response.data)
            })
    }, []) 
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

        </div>
    )
}

export default Home