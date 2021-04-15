import React, { useState, useEffect,useRef } from "react";
import "./styles/Products.css"
import { Link } from 'react-router-dom'
import productService from '../services/productService'

//what?
//product page main content that lists products to the user


const MainContent = () => {
    const [data, setData] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [searchResults,setSearchResults] =useState(undefined)
    const inputEl = useRef("")
    //console.log(data)
    

    useEffect(() => {
        productService
            .getAllProduct()
            .then(response => {
                //console.log(response)
                setData(response.products)
                setSearchResults(response.products)
            })

    }, [])

    const searchHandler = (search_input) => {
        setSearchTerm(inputEl.current.value)
        if(search_input !== ""){
            const newProductList = data.filter((product)=>{
                return Object.values(product)
                .join(" ")
                .toLowerCase()
                .includes(search_input.toLowerCase())
            })
            console.log(newProductList)
            setSearchResults(newProductList)
            
        }
        else{
            setSearchResults(data)
        }
    };

    const getSearchTerm =() =>{
        searchHandler(inputEl.current.value)
    };

    const searchFeedback = () =>{
        setSearchTerm(inputEl.current.value)
    };

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h1 className="header">Products</h1>

            <div className="search_bar">
                <div className="icon_input">
                    <input 
                    ref={inputEl}
                    type="text" 
                    placeholder = "Search Products" 
                    className="search_input" value={searchTerm} 
                    onChange={searchFeedback}
                    />
                    
                    <button className="search_button" type= "submit" onClick={getSearchTerm}>
                        <p>Search</p>
                        <i class="fa fa-search"/>
                    </button>
                </div>
            </div>

            <div className="main_content">
                {searchResults?.map((item) => (

                    <Link to={"/product/" + item._id} style={{ textDecoration: 'none' }} key={item._id}>
                        < div className="card" key={item._id} >
                            <div className="card_header">
                                <h2>
                                    {item.productName}
                                </h2>
                            </div>
                            <div className="card_image">
                                <img src={process.env.PUBLIC_URL + "/glass.jpg"} alt="product"/>
                            </div>
                            <div className="card_detail">

                                <p className="card_price">
                                    {item.unitPrice}TL
                                </p>
                                <button className="card_button">Add to Cart</button>
                            </div>


                        </div >
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MainContent