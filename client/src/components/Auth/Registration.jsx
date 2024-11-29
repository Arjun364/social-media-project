import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
// 3rd party
import { Formik, Form, Field, ErrorMessage } from 'formik';
// alert libary
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// APIs
import { registrationAPI } from '../../services/allAPIs';

const Registration = () => {
    const navigate = useNavigate()

    // the logic for the registration of the user 
    const createUserAccount = async (userCreditentials,resetForm,setErrors) => {
        try {
            // fetch the user registration api
            const result = await registrationAPI(userCreditentials)
            console.log(result);
            if (result.status>=200 && result.status<=299) {
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
                    transition: Bounce,})
                resetForm()
                setTimeout(()=>
                    navigate(`/login`)
                ,600)
            }else if(result.status==301){
                // for having both of the username and email 
                toast.error(result.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,})
                setErrors({username:result.response.data.message})
            }else if (result.status==302){
                // for having username present in the database
                toast.error(result.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,})
                setErrors({username:result.response.data.message})
            }else if(result.status==303){
                // for having email address present in the database
                toast.error(result.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,})
                setErrors({email:result.response.data.message})
            }
            
        } catch (err) {
            console.error(`Error in creating the is user`);
        }
    }
    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', Cpassword: "" }}
            validate={values => {
                const errors = {};
                // username section 
                if (!values.username) {
                    errors.username = 'username is required'
                } else if (values.username.length < 5) {
                    errors.username = 'Username has to be atleast 6 characters'
                }
                // email section 
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                //password section
                if (!values.password) {
                    errors.password = 'Password is required';
                } else if (values.password.length < 6) {
                    errors.password = 'Password must be at least 6 characters';
                } else if (!/[A-Z]/.test(values.password)) {
                    errors.password = 'Password must contain at least one uppercase letter';
                } else if (!/[!@#$%^&*]/.test(values.password)) {
                    errors.password = 'Password must contain at least one special character';
                } else if (values.Cpassword && values.password !== values.Cpassword) {
                    errors.Cpassword = 'Passwords do not match';
                }
                // confirm password section
                if (!values.Cpassword) {
                    errors.Cpassword = 'Confirm Password is required'
                } else if (values.Cpassword !== values.password) {
                    errors.Cpassword = 'incorrect password'
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting,resetForm,setErrors }) => {
                const userCreditentials = {username:values.username,email:values.email,password:values.password}
                createUserAccount(userCreditentials,resetForm,setErrors)
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className=' absolute mx-3 top-[2rem] md:top-0 rounded-lg md:min-h-full bg-white/40 backdrop-blur-sm md:relative flex-1 px-[2rem] py-[1rem] md:px-[4rem] lx:px-[5rem] flex justify-center  flex-col gap-3'>
                    <ToastContainer />
                    <h2 className='leading-[2rem] md:leading-[3.4rem] text-center md:text-left'>Join the Connectify Community 😘</h2>
                    <p className='text-center text-slate-700 dark:  md:text-left text-sm md:text-lg'>Connect and grow with like-minded people.</p>
                    {/* username section */}
                    <div className='flex flex-col gap-1'>
                        <Field className="txtbox" type="Text" name="username" placeholder='Your Name' />
                        <ErrorMessage className='errMsg' name="username" component="div" />
                    </div>
                    {/* email section */}
                    <div className='flex flex-col gap-1'>
                        <Field className="txtbox" type="email" name="email" placeholder='Your Email Address' />
                        <ErrorMessage className='errMsg' name="email" component="div" />
                    </div>
                    {/* password section */}
                    <div className='flex gap-2'>
                        <div className='flex-1'>
                            <Field className="txtbox" type="text" name="password" placeholder='Password' />
                            <ErrorMessage className='errMsg' name="password" component="div" />
                        </div>
                        <div className='flex-1'>
                            <Field className="txtbox" type="password" name="Cpassword" placeholder='Confirm password' />
                            <ErrorMessage className='errMsg' name="Cpassword" component="div" />
                        </div>
                    </div>
                    {/* button section */}
                    <div className='flex items-center justify-between gap-3 flex-col xl:flex-row '>
                        <button className='btn1' type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        <p className='text-sm '>By signing up you agree to our <span className='text-blue-600 cursor-pointer hover:underline underline-offset-2 hover:text-blue-700'>Terms and conditions</span></p>
                    </div>
                    {/* already sigup ? */}
                    <p className='text-center'>Already have a account ? <span className='text-blue-600 cursor-pointer hover:underline underline-offset-2 hover:text-blue-700' onClick={() => navigate('/login')}>Sign in </span></p>
                </Form>
            )}
        </Formik>
    )
}

export default Registration