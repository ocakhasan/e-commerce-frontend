import React from 'react'
import Navbar from "./Navbar.js"
import Footer from "./Footer.js"
import MainContent from "./MainContent.js"
import "./styles/Products.css"

const Products = ({data}) => {
    console.log("in products")
    return (
        <div className="container">
            <Navbar/>
            <MainContent data= {data}/>     
            <Footer/>
        </div>
    )
}

export default Products