import React, { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import productService from '../services/productService'


const Dashboard = () => {

    const [productData, setProductData] = useState([])

    useEffect(() => {
        productService
            .getAllProduct()
            .then(response => {
                setProductData(response.products)
            })
    }, [])
    const addProduct = (values) => {
        productService
            .addProduct(values)
            .then(response => {
                console.log(response)
                setProductData(productData.concat(response.product))
            })

    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        productService
            .deleteProduct(id)
            .then(response => {
                console.log(response)
                setProductData(productData.filter(product => product._id !== response.id))
            })
        

    }
    return (
        <div>
            <ProductForm addProduct={addProduct}/>
            {productData.reverse().map(product => (
                <div>
                    <li>{product.productName}</li>
                    <form onSubmit={(e) =>  handleDelete(e, product._id)}>
                        <button type="submit">Delete</button>
                    </form>
                </div>

            ))}
        </div>

    )
}

export default Dashboard