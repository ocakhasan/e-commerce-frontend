import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles/LoginForm.css'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'



const LoginForm = ({ handleLogin }) => {



    const [notification, setNotification] = useState(null)

    const history = useHistory();
    useEffect(() => {
        if (window.localStorage.getItem('logged')) {
            history.push("/")
        }
    }, [history])


    const formik = useFormik({
        initialValues: {
            userEmail: '',
            password: '',
        },
        validationSchema: Yup.object({
            userEmail: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),

        onSubmit: async values => {
            console.log(values)
            const result = await handleLogin(values)
            console.log("result ", result)
            if (result) {
                history.push('/')
            } else {
                setNotification('Wrong Credentials. Please try again')
                setTimeout(() => setNotification(null), 3000)
            }

        },
        validateOnChange: false,
        validateOnBlur: false
    })



    return (
        <div>
            {notification && <Alert severity="error">
                {notification}
            </Alert>}
            <div className="form-div">

                <div className="login-card">
                    <h2>Login to Shop</h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla atque temporibus fugiat at. Unde cumque dicta quis, est doloribus,
                    provident hic vero ad officiis rem eveniet, cupiditate dolor error sit.
                </div>
                <form onSubmit={formik.handleSubmit} className="detail_form">
                    {/* <div className="form-part">
                        <label className="clr-purple">Email</label>
                        <input type="email" name="email" {...formik.getFieldProps('userEmail')}
                        />
                    </div> */}
                    <TextField variant="outlined" type="email" id="standard-error" 
                    label="Email"
                        {...formik.getFieldProps('userEmail')} />

                    {formik.touched.userEmail && formik.errors.userEmail ? (
                        <div className="form-error">{formik.errors.userEmail}</div>
                    ) : null}

                    {/* <div className="form-part">
                        <label className="clr-purple">Password</label>
                        <input type="password" name="password" {...formik.getFieldProps('password')} />
                    </div> */}
                    <TextField variant="outlined" type="password" id="standard-error" 
                    label="Password"
                        {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="form-error">{formik.errors.password}</div>
                    ) : null}

                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                    <p>If you do not have an account, you can <Link to="/signup">sign-up</Link> from here</p>

                </form>
            </div>
        </div>



    )
}

export default LoginForm