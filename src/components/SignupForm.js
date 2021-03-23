import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from './Navbar'
import axios from 'axios'


const SignupForm = () => {



    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordValidation: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            passwordValidation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),

        onSubmit: values => {
            console.log('post request to submit')
            axios
                .post('/api/signup', values)
                .then((response) => {
                    console.log(response)
                    if (response.data.status) {
                        console.log('success')
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla atque temporibus fugiat at. Unde cumque dicta quis, est doloribus,
                    provident hic vero ad officiis rem eveniet, cupiditate dolor error sit.
                </div>

                <form onSubmit={formik.handleSubmit} className="form">
                    <div className="form-part">
                        <label className="clr-purple">Name</label>
                        <input type="text" {...formik.getFieldProps('name')} />
                    </div>

                    {formik.touched.name && formik.errors.name ? (
                        <div className="form-error">{formik.errors.name}</div>
                    ) : null}

                    <div className="form-part">
                        <label className="clr-purple">Email</label>
                        <input type="email" name="email" {...formik.getFieldProps('email')} />
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

                    <div className="form-part">
                        <label className="clr-purple">Password Again</label>
                        <input type="password" name="passwordValidation"
                            {...formik.getFieldProps('passwordValidation')} />
                    </div>

                    {formik.touched.passwordValidation && formik.errors.passwordValidation ? (
                        <div className="form-error">{formik.errors.passwordValidation}</div>
                    ) : null}


                    <button type="submit" className="btn clr-purple">
                        Sign Up
                    </button>
                    <p>If you have an account, you can <Link to="/login">login</Link> from here</p>

                </form>
            </div>


        </div>
    )
}

export default SignupForm