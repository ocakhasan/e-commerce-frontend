import React from "react";
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';



const Form = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })

    return (

        <form onSubmit={formik.handleSubmit} className="form">
            <div className="form-part">
                <label className="clr-purple">Email</label>
                <input type="text" name="email" {...formik.getFieldProps('email')}
                />
            </div>
            {formik.touched.email && formik.errors.email ? (
                <div className="form-error">{formik.errors.email}</div>
            ) : null}

            <div className="form-part">
                <label className="clr-purple">Password</label>
                <input type="password" name="password" {...formik.getFieldProps('password')} />
            </div>
            {formik.touched.password && formik.errors.password ? (
                <div className="form-error">{formik.errors.password}</div>
            ) : null}

            <button type="submit" className="btn clr-purple" disabled={formik.isSubmitting}>
                Login
            </button>
            <p>If you do not have an account, you can <Link to="/signup">sign-up</Link> from here</p>
        </form>
    )
}

export default Form