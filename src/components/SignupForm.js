import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import './styles/SignupForm.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'



const SignupForm = () => {


    const history = useHistory()
    useEffect(() => {
        if (window.localStorage.getItem('logged')) {
            history.push("/")
        }
    }, [history])


    const formik = useFormik({
        initialValues: {
            username: '',
            userEmail: '',
            password: '',
            passwordValidation: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Name is required'),
            userEmail: Yup.string().email('Invalid email address').required('Email is required'),
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
                        history.push('/login')
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


            <div className="form-div">
                <div className="login-card">
                    <h2>Signup to Shop</h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla atque temporibus fugiat at. Unde cumque dicta quis, est doloribus,
                    provident hic vero ad officiis rem eveniet, cupiditate dolor error sit.
                </div>

                <form onSubmit={formik.handleSubmit} className="detail_form">
                    <TextField variant="outlined" type="text" id="standard-error"
                        label="Username"
                        {...formik.getFieldProps('username')} />

                    {formik.touched.username && formik.errors.username ? (
                        <div className="form-error">{formik.errors.username}</div>
                    ) : null}

                    <TextField variant="outlined" type="email" id="standard-error"
                        label="Email"
                        {...formik.getFieldProps('userEmail')} />

                    {formik.touched.userEmail && formik.errors.userEmail ? (
                        <div className="form-error">{formik.errors.userEmail}</div>
                    ) : null}

                    <TextField variant="outlined" type="password" id="standard-error"
                        label="Password"
                        {...formik.getFieldProps('password')} />

                    {formik.touched.password && formik.errors.password ? (
                        <div className="form-error">{formik.errors.password}</div>
                    ) : null}

                    <TextField variant="outlined" type="password" id="standard-error"
                        label="Password Again"
                        {...formik.getFieldProps('passwordValidation')} />

                    {formik.touched.passwordValidation && formik.errors.passwordValidation ? (
                        <div className="form-error">{formik.errors.passwordValidation}</div>
                    ) : null}


                    <Button type="submit" color="primary" variant="contained">
                        Sign Up
                    </Button>
                    <p>If you have an account, you can <Link to="/login">login</Link> from here</p>

                </form>
            </div>


        </div>
    )
}

export default SignupForm