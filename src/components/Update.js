import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import productService from '../services/productService'
import { useFormik } from 'formik'


const UpdateForm = () => {
    const params = useParams()
    const [data, setData] = useState(null)
    

    useEffect(() => {
        productService
            .getProduct(params.id)
            .then(response => {
                console.log(response)
                setData(response.product)
            })
    }, [params.id])

    const ProductInfo = () => {
        if (data) {
            return (
                <ul>
                    <li>Product Name = {data.productName}</li>
                    <li>Description = {data.description}</li>
                    <li>Unit Price = {data.unitPrice}</li>
                    <li>Stock = {data.stock}</li>
                    <li>Warranty = {data.warranty}</li>
                    <li>Category = {data.categoryID}</li>
                </ul>
            )
        } 
        return <p>Loading</p>
    }
    
    const UpdateForm = () => {
        const history = useHistory()

        const formik = useFormik({
            initialValues: {
                productName: data.productName,
                description: data.description,
                unitPrice: data.unitPrice,
                categoryID: data.categoryID,
                stock: data.stock,
                warranty: data.warranty,
                rate: 0
            },
    
            onSubmit: values => {
                console.log('post request to submit')
                
                productService
                    .updateProduct(data, values)
                    .then((response) => {
                        console.log(response)
                        history.push('/dashboard')
                    })
    
            },
            validateOnChange: false,
            validateOnBlur: false
        })
    
        return (
    
    
    
            <form onSubmit={formik.handleSubmit} className="dashboard_form">
                <div className="form-part">
                    <label className="clr-purple">Product Name</label>
    
                    <input type="text"
                        {...formik.getFieldProps('productName')} />
                </div>
    
    
    
                <div className="form-part">
                    <label className="clr-purple">description</label>
                    <input type="text"
                        {...formik.getFieldProps('description')} />
                </div>
    
    
    
                <div className="form-part">
                    <label className="clr-purple">Price</label>
                    <input type="number"
                        {...formik.getFieldProps('unitPrice')} />
                </div>
    
                <div className="form-part">
                    <label className="clr-purple">Category</label>
                    <input type="number" 
                        {...formik.getFieldProps('categoryID')} />
                </div>
    
                <div className="form-part">
                <label className="clr-purple">Stock</label>
                    <input type="number" 
                        {...formik.getFieldProps('stock')} />
                </div>
    
                <div className="form-part">
                    <label className="clr-purple">Warranty</label>
                    <input type="number" 
                        {...formik.getFieldProps('warranty')} />
                </div>
    
    
                <button type="submit" className="btn clr-purple">
                    Update Product
                </button>
    
            </form>
    
        )
    
    }
    return (
        <div>
            <ProductInfo />
            <h3>Update Product</h3>
            {data && <UpdateForm />}
            

        </div>
        
       
    )
}

export default UpdateForm