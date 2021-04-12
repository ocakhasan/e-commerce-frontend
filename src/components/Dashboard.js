import React, { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import productService from '../services/productService'
import './styles/dashboard.css'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Dashboard = () => {

    const [productData, setProductData] = useState([])

    useEffect(() => {
        productService
            .getAllProduct()
            .then(response => {
                console.log(response)
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

    const DasbordProduct = () => (
        <div className="dashboard_div">
            <ProductForm addProduct={addProduct} />
            {productData.map(product => (


                <div className="dashboard_product">
                    <div className="product_details">
                        <Link to={"/product/" + product._id}><p className="prod_name">{product.productName}</p></Link>
                        <p className="prod_desc">{product.description}</p>
                    </div>
                    <div className="product_buttons">
                        <button className="product_button" type="submit"
                            onSubmit={(e) => handleDelete(e, product._id)}>Delete</button>

                        <button className="product_button" type="submit"
                            onSubmit={(e) => handleDelete(e, product._id)}>Update</button>

                    </div>

                </div>






            ))}
        </div>

    )

    return (
        <Tabs>
            <TabList>
                <Tab>Products</Tab>
                <Tab>Comments</Tab>
            </TabList>

            <TabPanel>
                <DasbordProduct />
            </TabPanel>
            <TabPanel>
                <h2>Comments will be here</h2>
            </TabPanel>
        </Tabs>
    )
}

export default Dashboard