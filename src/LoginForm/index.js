import React from "react";
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from "../Navbar";
import axios from 'axios'
import './LoginForm.css'



const LoginForm = () => {

    const history = useHistory();

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
            axios
                .post('/api/login', values)
                .then((response) => {
                    console.log(response)
                    if (response.data.status) {
                        console.log('success')
                        history.push('/')
                    } else {
                        console.log("failure")
                        console.log(response.data.message)
                    }
                }) 
        },
        validateOnChange: false,
        validateOnBlur: false
    })

    return (
        <div>

            <Navbar />

            <div className="form-div">
                <div className="login-card">
                    <h2>Login to Shop</h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla atque temporibus fugiat at. Unde cumque dicta quis, est doloribus,
                    provident hic vero ad officiis rem eveniet, cupiditate dolor error sit.
                </div>
                <form onSubmit={formik.handleSubmit} className="form">
                    <div className="form-part">
                        <label className="clr-purple">Email</label>
                        <input type="email" name="email" {...formik.getFieldProps('email')}
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
            </div>
        </div>



    )
}

export default LoginForm