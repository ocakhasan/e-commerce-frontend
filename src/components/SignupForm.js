import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';



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
            alert(JSON.stringify(values, null, 2));
        },
        validateOnChange: false,
        validateOnBlur: false
    })

    return (
        <form onSubmit={formik.handleSubmit} className="form">
            <div className="form-part">
                <label className="clr-purple">Name</label>
                <input type="text" name="name" {...formik.getFieldProps('name')} />
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


            <button type="submit" className="btn clr-purple" disabled={formik.isSubmitting}>
                Sign Up
            </button>
            <p>If you have an account, you can <Link to="/login">login</Link> from here</p>

        </form>
    )
}

export default SignupForm