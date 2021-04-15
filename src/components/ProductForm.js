import React from 'react'
import { useFormik } from 'formik'


const ProductForm = ({ addProduct }) => {

    const formik = useFormik({
        initialValues: {
            productName: '',
            description: '',
            unitPrice: 0,
            categoryID: 0,
            stock: 0,
            warranty: 0,
            rate: 0
        },

        onSubmit: values => {
            console.log('post request to submit')
            addProduct(values)

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
                Add Product
            </button>

        </form>

    )

}

export default ProductForm