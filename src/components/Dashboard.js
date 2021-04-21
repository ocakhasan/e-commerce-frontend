import React, { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import productService from '../services/productService'
import { Link, useHistory } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import commentService from '../services/commentService';
import 'react-tabs/style/react-tabs.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import './styles/dashboard.css'

const Dashboard = () => {

    const [productData, setProductData] = useState([])
    const [commentData, setCommentData] = useState([])
    const [allowed, setAllowed] = useState(false)
    const [nofitication, setNotification] = useState(null)
    const history = useHistory()


    useEffect(() => {
        const logged = JSON.parse(window.localStorage.getItem('logged'))
        console.log(logged)
        console.log(logged.userType)


        if (!logged) {
            history.push("/login")
        } else if (logged.userType === 0) {
            setNotification("You are not allowed for the admin panel")
        }
        else {
            setAllowed(true)
            productService
                .getAllProduct()
                .then(response => {
                    console.log(response)
                    setProductData(response.products)
                })
        }
    }, [history])


    useEffect(() => {
        commentService
            .getAllComments()
            .then(response => {
                console.log("comments", response)
                setCommentData(response.comments)
            })
    }, [])


    const addProduct = (values) => {

        console.log(values)
        const toSend = { userType: 2, ...values }
        console.log(toSend)
        productService
            .addProduct(toSend)
            .then(response => {
                setNotification("New Product Added")
                setTimeout(() => setNotification(null), 3000)
                console.log(response)
                setProductData(productData.concat(response.product))
            })
            .catch(error => console.log(error))

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
                console.log("comment approval", response)
                console.log("comments", commentData)
                if (response.status) {
                    setNotification(`Product with ${comment._id} approved`)
                    setTimeout(() => setNotification(null), 3000)
                    setCommentData(commentData.map(com => com._id === comment._id ? { ...comment, approval: !comment.approval } : com))
                }
            })
    }

    const Comments = () => {
        if (commentData) {
            return (
                <TableContainer style={{ maxWidth: 900, margin: "auto" }} component={Paper}>

                    <h1>Comments</h1>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Comment</TableCell>
                                <TableCell align="right">Owner</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Approve</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {commentData.map(comment => (
                                <TableRow key={comment._id}>
                                    <TableCell component="th" scope="row">
                                        {comment.content}
                                    </TableCell>
                                    <TableCell align="right">{comment.owner}</TableCell>
                                    <TableCell align="right">{new Date(comment.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary"
                                            onClick={() => approveComment(comment)}>{comment.approval ? <div className="approveIcon"><ThumbDownIcon /> Disapprove</div> : <div className="approveIcon"><ThumbUpIcon />Approve</div>}
                                        </Button>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        } return <p>Loading</p>
    }

    /* const DasbordProduct = () => (
        <div className="dashboard_div">


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
    ) */

    const Products = () => (

        <TableContainer style={{ maxWidth: 900, margin: "auto" }} component={Paper}>
            <h1>Products</h1>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Rate</TableCell>
                        <TableCell align="right">Delete</TableCell>
                        <TableCell align="right">Update</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    {productData.map(product => (
                        <TableRow key={product._id}>
                            <TableCell component="th" scope="row">
                                {product.productName}
                            </TableCell>
                            <TableCell align="center">{product.description}</TableCell>
                            <TableCell align="center">{product.rateCount}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="secondary"
                                    onClick={(e) => handleDelete(e, product._id)}>
                                    <DeleteIcon />Delete
                                </Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="primary" href={"/update/product/" + product._id}>
                                    <SystemUpdateAltIcon />
                                    Update
                                </Button>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <div>

            {nofitication && <p className="clr-green">{nofitication}</p>}
             {allowed && <Tabs>
                <TabList>
                    <Tab>Products</Tab>
                    <Tab>Comments</Tab>
                </TabList>

                <TabPanel>
                    <ProductForm addProduct={addProduct}/>
                    <Products />
                </TabPanel>
                <TabPanel>
                    <Comments />
                </TabPanel>
            </Tabs>} 

        </div>
    )
}

export default Dashboard