import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useFormik } from 'formik';
import { useAuth } from '../AuthContext.js';
import * as Yup from 'yup';
import {auth} from "./../firebase.js";
import styles from "./../styles/login.module.css"
import threeBurgers from "./../images/three-burgers.jpg";
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const initialValues = {
    email: '',
    password: '',
};

const SignIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    // const signInUser = (values) => {
    //     const {email, password} = values;
    //     // e.preventDefault();
    //     console.log("Email is " ,email);
    //     console.log("Password is " , password);
    //     signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    //         console.log(userCredential);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {

            try{
                await login(values.email, values.password);

                setSubmitting(false);
                navigate('/admin', {replace: true});
                console.log("After logging in");
            }catch(error){
                console.log('Login failed', error.message);
            }
            // signInUser(values);
            // setSubmitting(false);
            // <Navigate to="/" replace={true} />
            // console.log("After logging in")
        },
    });

    return (
        <div className={styles.formContainer}>
            <div className={styles.wrapper}>

                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <h1 className={styles.formTitle}>Login Form</h1>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input type="email" id='email' name='email' className={styles.input} placeholder='Enter your email' {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email && (
                            <div className={styles.error}>{formik.errors.email}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input type="password" id='password' name='password' className={styles.input} placeholder='Enter your password' {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password && (
                            <div className={styles.error}>{formik.errors.password}</div>
                        )}
                    </div>
                    
                    <button type='submit'>Login</button>
                </form>
                <img className={styles.loginImg} src={threeBurgers} alt="login image" />
            </div>
        </div>

)
}

export default SignIn;