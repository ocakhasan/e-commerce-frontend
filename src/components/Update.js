import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productService from '../services/productService'


const UpdateForm = () => {
    const params = useParams()
    const [data, setData] = useState(null)
    useEffect(() => {
        productService
            .getProduct(params.id)
            .then(response => {
                console.log(response)
                setData(response.product)
            })
    }, [params.id])

    const ProductInfo = () => {
        if (data) {
            return (
                <ul>
                    <li>Product Name = {data.productName}</li>
                    <li>Description = {data.description}</li>
                    <li>Unit Price = {data.unitPrice}</li>
                    <li>Stock = {data.stock}</li>
                    <li>Warranty = {data.warranty}</li>
                    <li>Category = {data.categoryID}</li>
                </ul>
            )
        } 
        return <p>Loading</p>
    }
    return (
        <div>
            <ProductInfo />
            <h3>Update Product</h3>
            

        </div>
        
       
    )
}

export default UpdateForm