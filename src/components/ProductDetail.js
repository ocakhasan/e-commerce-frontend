import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import productService from '../services/productService'
import commentService from '../services/commentService'
import cartService from '../services/cartService'

import './styles/productDetail.css'

import Comment from './ProductUtils/Comment'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import StarRatingComponent from 'react-star-rating-component';

const ProductDetail = () => {
    const params = useParams()
    const [data, setData] = useState(null)
    const [commentData, setCommentData] = useState(null)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [notification, setNotification] = useState(null)
    const [success, setSuccess] = useState(false)
    const history = useHistory()


    const handleComment = (e) => {
        console.log("New Product")
        e.preventDefault()
        if (!window.localStorage.getItem('logged')) {
            history.push("/login")
        } else {
            commentService
                .addComment({
                    productID: data._id,
                    content: comment
                }).then(response => {
                    if (response.status) {
                        setCommentData(response.comments)
                        setNotification("Comment sent! Waiting for approval!")
                        setSuccess(true)
                        setTimeout(() => setNotification(null), 3000)
                    } else {
                        setNotification("Comment did not sent.")
                        setSuccess(false)
                        setTimeout(() => setNotification(null), 3000)
                    }
                }).catch(_error => {
                    setNotification("Comment did not sent.")
                    setSuccess(false)
                    setTimeout(() => setNotification(null), 3000)
                })
        }
    }

    useEffect(() => {

        console.log(params.id)
        productService
            .getProduct(params.id)
            .then(response => {
                console.log(response)
                setData(response.product)
                setCommentData(response.product.comments)
            })


    }, [params.id])

    const handleRate = (nextValue, prevValue, name) => {
        setRating(nextValue)
        //const currentTotalRate = data.rateCount * data.rateTotal
    }

    const addCart = (e) => {
        e.preventDefault()
        console.log("add to cart")
        if (!window.localStorage.getItem("logged")) {
            if (!window.localStorage.getItem("cart_without_login")) {
                let currentCart = [data._id]
                console.log(typeof(currentCart))
                window.localStorage.setItem("cart_without_login", JSON.stringify(currentCart))
            } else {
                let currentCart = JSON.parse(window.localStorage.getItem("cart_without_login"))
                console.log(typeof(currentCart))
                window.localStorage.setItem("cart_without_login", JSON.stringify(currentCart.concat(data._id)))
            }
            setNotification("Product added to cart successfully")
            setSuccess(true)
            setTimeout(() => setNotification(null), 3000)
        } else {
            cartService
                .addProductCard(data._id)
                .then(response => {
                    if (response.status) {
                        setNotification("Product added to cart successfully")
                        setSuccess(true)
                        setTimeout(() => setNotification(null), 3000)
                        window.localStorage.setItem("logged", JSON.stringify(response.user))
                    } else {
                        setNotification("Operation unsuccessful")
                        setSuccess(false)
                        setTimeout(() => setNotification(null), 3000)
                    }
                })
                .catch(_error => {
                    setNotification("Operation unsuccessful")
                    setSuccess(false)
                    setTimeout(() => setNotification(null), 3000)
                })

        }

    }



    if (data) {
        return (
            <div>
                {notification && <Snackbar open={notification} autoHideDuration={6000} >
                    <Alert severity={success ? "success" : "error"}>
                        {notification}
                    </Alert>
                </Snackbar>}
                <div className="product_detail">

                    <div className="detail_image">
                        <img alt="product" className="image" src={process.env.PUBLIC_URL + "/glass.jpg"} />
                    </div>
                    <div className="details">
                        <div className="details_header">
                            <p className="product_name">{data.productName}</p>
                            <p >{data.description}</p>

                        </div>
                        <div className="details_price">
                            <div className="sale_prices">
                                <div className="sale">
                                    <p>%2</p>
                                    <small>İndirim</small>
                                </div>
                                <div className="prices">
                                    <p className="old_price">{data.previousPrice}</p>
                                    <p className="new_price">{data.unitPrice} TL</p>
                                </div>

                            </div>
                            <div className="product_rating">
                                <StarRatingComponent
                                    name={data._id}
                                    starCount={5}
                                    value={rating}
                                    onStarClick={handleRate}
                                />


                                <small>{data.rateCount} değerlendirme</small>
                            </div>
                        </div>

                        <p>Current Stock : {data.stock}</p>


                        {
                            data.stock ?
                                <div className="product_buy">
                                    <form onSubmit={addCart}>
                                        <button className="buy_button" type="submit" >Add to Cart</button>

                                    </form>

                                </div> :
                                <p>You cannot buy</p>
                        }


                    </div>

                </div>

                <div className="add_comment">
                    <form onSubmit={handleComment}>

                        <TextField id="standard-error" label="Comment" defaultValue=""
                            onChange={(e) => setComment(e.target.value)} />
                        <Button variant="contained" color="primary" type="submit">Send</Button>

                    </form>

                </div>


                <div className="comments">
                    <h2>Comments</h2>
                    {commentData && commentData.reverse().map(comment => (
                        <div>
                            {comment.approval?  <Comment comment={comment} /> : null}
                        </div>
                    ))}
                </div>


            </div>

        )

    } else {
        return <Alert severity="info">Loading</Alert>
    }
}

export default ProductDetail