import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import productService from '../services/productService'
import SalesUpdateForm from './DashboardUtils/SalesUpdateForm'
import ProductUpdateForm from './DashboardUtils/UpdateForm'
import CartProduct from './CartUtils/CartProduct'


const UpdateForm = () => {
    const params = useParams()
    const [data, setData] = useState(null)
    const [user, setUser] = useState(1)
    


    useEffect(() => {
        productService
            .getProduct(params.id)
            .then(response => {
                console.log(response)
                setData(response.product)
            })
    }, [params.id])

    useEffect(() => {
        const logged = window.localStorage.getItem("logged")
        if (logged) {
            setUser(JSON.parse(logged).userType)
        }
    }, [])

    const ProductInfo = () => {
        if (data) {
            return (
                
                <CartProduct product={data} showButton={false}/>
            )
        }
        return <p>Loading</p>
    }

    const SalesProductInfo = () => {
        if (data) {
            return (
                <ul>
                    <li>Product Name = {data.productName}</li>
                   
                    <li>Unit Price = {data.unitPrice}</li>
                    <li>Previous Price = {data.previousPrice}</li>

                    <li>Stock = {data.stock}</li>
                </ul>
            )
        }
        return <p>Loading</p>
    }

    /* const SalesUpdateForm = () => {
        const history = useHistory()
        const formik = useFormik({
            initialValues: {
                unitPrice: data.unitPrice,
                previousPrice: data.previousPrice
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



            <form onSubmit={formik.handleSubmit}>

                <div className="form-part">
                    <label className="clr-purple">Base Price</label>
                    <input type="number"
                        {...formik.getFieldProps('unitPrice')} />
                </div>

                <div className="form-part">
                    <label className="clr-purple">Sale Price</label>
                    <input type="number"
                        {...formik.getFieldProps('previousPrice')} />
                </div>


                <Button variant="outlined" color="secondary">
                    Set the Price
                </Button>

            </form>

        )
    } */

    /* const UpdateForm = () => {
        
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



            <form onSubmit={formik.handleSubmit}>
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


                <Button type="submit" variant="outlined" color="secondary">
                    Update Product 
                </Button>

            </form>

        )

    } */
    return (
        <div>
            <ProductInfo />
            <h3>Update Product</h3>
            {user===1 && data && <SalesUpdateForm data={data}/>}
            {user===2 && data && <ProductUpdateForm data={data}/>}


        </div>


    )
}

export default UpdateForm