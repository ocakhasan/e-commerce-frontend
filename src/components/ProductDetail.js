import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import productService from '../services/productService'
import commentService from '../services/commentService'
import './styles/productDetail.css'
import ReactStars from "react-rating-stars-component";

const ProductDetail = () => {
    const params = useParams()
    const [data, setData] = useState()
    const [notification, setNotification] = useState('')
    const [comment, setComment] = useState('')
    const history = useHistory()


    const handleComment = (e) => {
        e.preventDefault()
        if (!window.localStorage.getItem('logged')){
            history.push("/login")
        }
        commentService
            .addComment({
                productID: data._id,
                content: comment
            })
    }

    useEffect(() => {

        console.log(params.id)
        productService
            .getProduct(params.id)
            .then(response => {
                console.log(response)
                setData(response.product)
            })
            .catch(_error => setNotification("product idoes not exist"))

    }, [params.id])


    if (data) {
        return (
            <div>

                <div className="product_detail">
                    <p>{notification}</p>
                    <div className="detail_image">
                        <img alt="product" className="image" src={process.env.PUBLIC_URL + "/glass.jpg"} />
                    </div>
                    <div className="details">
                        <div className="details_header">
                            <p className="product_name">{data.productName}</p>
                            <small className="product_brand">BRAND NAME</small>

                        </div>
                        <div className="details_price">
                            <div className="sale_prices">
                                <div className="sale">
                                    <p>%2</p>
                                    <small>İndirim</small>
                                </div>
                                <div className="prices">
                                    <p className="old_price">3000</p>
                                    <p className="new_price">{data.unitPrice} TL</p>
                                </div>

                            </div>
                            <div className="product_rating">
                                <ReactStars
                                    value={data.rate}
                                    count={5}
                                    onChange={() => console.log("kasjfgjsa")}
                                    size={24}
                                    activeColor="#ffd700"
                                />


                                <small>200 değerlendirme</small>
                            </div>
                        </div>



                        <div className="product_buy">
                            <form>
                                <button className="buy_button">Add to Cart</button>
                            </form>
                        </div>
                    </div>

                </div>

                <div className="add_comment">
                    <form onSubmit={handleComment}>
                        <label>Comment</label>
                        <input onChange={(e) => setComment(e.target.value)}></input>
                        <button type="submit">Send</button>
                    </form>

                </div>

                
                <div className="comments">
                    <h2>Comments</h2>
                    {data.comments && data.comments.map(comment => (
                        <p>{comment.content}</p>
                    ))}
                </div>


            </div>

        )

    } else {
        return <h1>Loading</h1>
    }
}

export default ProductDetail