import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// 3rd party libary
import { Formik, Form, Field, ErrorMessage } from 'formik';
// alert libary
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../routes/AuthContext';
// apis
import { loginAPI } from '../../services/allAPIs';

const Login = () => {
    const { login } = useAuth()
    const handleSignIn = async (userData,resetForm,setErrors) => {
        try {
            // fetch the login api 
            const result = await loginAPI(userData)
            console.log(result);
            if (result.status >= 200 && result.status <= 299) {
                // for success registration
                toast.success(result.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                const userdata ={
                    userid:result.data.user._id,
                    role:result.data.user.role
                }
                setTimeout(()=>{
                    login(userdata,result.data.token);
                    navigate('/home')},1000)
            } else if (result.status == 401) {
                // for Invalid username or password
                toast.error(result.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setErrors({ password: result.response.data.message })
            } else if (result.status == 402) {
                // for doesnt have username present in the database
                toast.error(result.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setErrors({ username: result.response.data.message })
            }
        } catch (error) {
            console.error(`The login error ${error}`);
        }
        
    };

    const navigate = useNavigate()
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.username) {
                    errors.username = 'username required'
                }

                if (!values.password) {
                    errors.password = 'password required'
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
                const user = { username: values.username, password: values.password }

                handleSignIn(user,resetForm,setErrors);
                // navigate('/home')
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='absolute mx-3 top-[4rem] md:top-0 rounded-lg md:min-h-full bg-white/10 backdrop-blur-sm md:relative flex-1 px-[2rem] py-[1rem] md:px-[4rem] lx:px-[5rem] flex justify-center flex-col gap-3 text-white md:text-black'>
                    <ToastContainer />
                    <h2 className='leading-[2.5rem] md:leading-[3.4rem] text-center md:text-left'>Welcome to Connectify</h2>
                    <p className='text-sm md:text-lg text-center md:text-left '>Connect and grow with like-minded people.</p>
                    <div>
                        <Field className="txtbox text-black" type="type" name="username" placeholder='Your username' />
                        <ErrorMessage className='errMsg' name="username" component="div" />
                    </div>
                    <div>
                        <Field className="txtbox text-black" type="password" name="password" placeholder='your password' />
                        <ErrorMessage className='errMsg' name="password" component="div" />
                    </div>
                    <button className='btn1' type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                    {/* already sigup ? */}
                    <p className='text-center text-sm md:text-base'>Doesn't have a account ? <span className='text-blue-600 cursor-pointer hover:underline underline-offset-2 hover:text-blue-700' onClick={() => navigate('/registration')}>Sign Up </span></p>
                </Form>
            )}
        </Formik>
    )
}

export default Login