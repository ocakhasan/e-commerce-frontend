import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import productService from '../../services/productService'

const SalesUpdateForm = ({data}) => {
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            unitPrice: data?.unitPrice,
            previousPrice: data?.previousPrice
        },

        onSubmit: values => {
            console.log('post request to submit')
            productService
                .changePrice(values.unitPrice, values.previousPrice, data)
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


            <Button variant="outlined" color="secondary" type="submit">
                Set the Price
            </Button>

        </form>

    )
}

export default SalesUpdateForm