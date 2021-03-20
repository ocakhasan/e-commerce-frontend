import React, { useState } from "react";
import './form.css'

const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submittted")
}

const Form = () => {
    const [name, setName] = useState('')
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" className="input_name" 
                    onChange={(e) => setName(e.target.value)}>
                </input>
                <button type="submit" className="btn">Submit</button>
            </form>
            <p>{name}</p>
        </div>
    )
}

export default Form