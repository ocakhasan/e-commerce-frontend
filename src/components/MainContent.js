import React from "react";
import "./styles/Products.css"


const MainContent = ({data}) => {
    console.log("in main content")

    const listitems = data.map((item)=>
    <div className="card" key={item._id}>
        <div className="card_header">
            <h2>
               { item.name}
            </h2>
        </div>
        <div className="card_image">
            <img src={item.image} />
        </div>
        <div className="card_detail">
           
            <p>{item.description}</p>
            <p className= "card_price">
                {item.price}$
            </p> 
            <div className="card_button">Add to Cart</div>
        </div>


    </div> 
    
    );
    return (
        <div className= "main_content">
            <h1 className= "header">Products</h1>
            {listitems}
        </div>

        
    )
}

export default MainContent