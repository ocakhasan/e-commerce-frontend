import React, { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import productService from '../services/productService'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './styles/dashboard.css'
import commentService from '../services/commentService';

const Dashboard = () => {

    const [productData, setProductData] = useState([])
    const [commentData, setCommentData] = useState([])
    const [nofitication, setNotification] = useState(null)

    useEffect(() => {
        productService
            .getAllProduct()
            .then(response => {
                console.log(response)
                setProductData(response.products)
            })
    }, [])

    useEffect(() => {
        commentService
            .getAllComments()
            .then(response => {
                console.log("comments", response)
                setCommentData(response.comments)
            })
    }, [])


    const addProduct = (values) => {

        productService
            .addProduct(values)
            .then(response => {
                setNotification("New Product Added")
                setTimeout(() => setNotification(null), 3000)
                console.log(response)
                setProductData(productData.concat(response.product))
            })

    }

    const handleDelete = (e, id) => {

        e.preventDefault()
        setNotification("Product is Deleted")
        setTimeout(() => setNotification(null), 3000)
        productService
            .deleteProduct(id)
            .then(response => {
                console.log(response)
                setProductData(productData.filter(product => product._id !== response.id))
            })
    }

    const approveComment = (comment) => {
        console.log("I am here")
        commentService
            .approveComment(comment)
            .then(response => {
                setNotification(`Product with ${comment._id} approved`)
                setTimeout(() => setNotification(null), 3000)
            })
    }

    const Comments = () => {
        if (commentData) {
            return (
                <div>
                    {commentData.map(comment => (
                        <div>
                            <p>{comment.content}</p>
                            <button type="submit" onClick={() => approveComment( comment)}
                                >{comment.approval? "Disapprove": "Approve"}</button>
                        </div>

                    ))}
                </div>
            )
        } return <p>Loading</p>
    }

    const DasbordProduct = () => (
        <div className="dashboard_div">
            {nofitication && <p className="clr-green">{nofitication}</p>}
            <ProductForm addProduct={addProduct} />
            {productData.map(product => (


                <div className="dashboard_product" key={product._id}>
                    <div className="product_details">
                        <Link to={"/product/" + product._id}><p className="prod_name">{product.productName}</p></Link>
                        <p className="prod_desc">{product.description}</p>
                    </div>
                    <div className="product_buttons">
                        <button className="product_button" type="submit"
                            onClick={(e) => handleDelete(e, product._id)}>Delete</button>

                        <Link to={"/update/product/" + product._id}>
                            <span className="product_button"
                            >Update</span>
                        </Link>

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
                <Comments />
            </TabPanel>
        </Tabs>
    )
}

export default Dashboard