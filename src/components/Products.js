import React from 'react'
import MainContent from "./MainContent.js"
import "./styles/Products.css"

const Products = ({data}) => {
    console.log("in products")
    return (
        <div className="product_container">
            <MainContent data= {data}/>     
        </div>
    )
}

export default Products