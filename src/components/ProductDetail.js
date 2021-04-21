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
import StarRatingComponent from 'react-star-rating-component';

const ProductDetail = () => {
    const params = useParams()
    const [data, setData] = useState(null)
    const [commentData, setCommentData] = useState(null)
    const [success, setSuccess] = useState(null)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const history = useHistory()


    const handleComment = (e) => {
        e.preventDefault()
        if (!window.localStorage.getItem('logged')) {
            history.push("/login")
        } else {
            commentService
                .addComment({
                    productID: data._id,
                    content: comment
                })
                .then(response => {
                    if (response.status) {
                        setCommentData(response.comments)
                    }
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
        const currentTotalRate = data.rateCount * data.rateTotal
    }

    const addCart = (e) => {
        e.preventDefault()
        console.log("add to cart")
        cartService
            .addProductCard(data._id)
            .then(response => {
                if (response.status) {
                    setSuccess(<Alert severity="success">Product Added</Alert> )
                } else {
                    setSuccess(<Alert severity="error">Product is not added</Alert> )
                }
            })
            .catch(_error => {
                setSuccess(false)
            })
    }



    if (data) {
        return (
            <div>
                {success}
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
                    {commentData && commentData.map(comment => (

                        <Comment comment={comment} />
                    ))}
                </div>


            </div>

        )

    } else {
        return <h1>Loading</h1>
    }
}

export default ProductDetail