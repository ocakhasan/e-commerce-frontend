import React from 'react'
import { useFormik } from 'formik'


const ProductForm = ({addProduct}) => {

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

                <input type="text" placeholder="Product Name"
                    {...formik.getFieldProps('productName')} />
            </div>



            <div className="form-part">
                <input type="text" placeholder="description"
                    {...formik.getFieldProps('description')} />
            </div>

            

            <div className="form-part">
                
                <input type="number" placeholder="Price" 
                    {...formik.getFieldProps('unitPrice')} />
            </div>

            <div className="form-part">
                
                <input type="number" placeholder="Category" 
                    {...formik.getFieldProps('categoryID')} />
            </div>

            <div className="form-part">
                
                <input type="number" placeholder="Stock" 
                    {...formik.getFieldProps('stock')} />
            </div>

            <div className="form-part">
                
                <input type="number" placeholder="Warranty" 
                    {...formik.getFieldProps('warranty')} />
            </div>

        

           

            


            <button type="submit" className="btn clr-purple">
                Add Product
            </button>
           

        </form>


    )

}

export default ProductForm