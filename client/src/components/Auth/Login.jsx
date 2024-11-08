import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = () => {
    const {login} =useAuth()
    const handleSignIn = (userData) => {
        login(userData);
    };

    const navigate = useNavigate()
    return (
        <Formik
            initialValues={{ username: '', role: '' }}
            validate={values => {
                const errors = {};
                if (!values.username) {
                    errors.username = 'username required'
                }

                if (!values.role) {
                    errors.role = 'role required'
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                const user ={
                    username:values.username,
                    role:values.role
                }
                
                handleSignIn(user);
                alert(`user created : ${user.username}`)
                navi
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='absolute mx-3 top-[4rem] md:top-0 rounded-lg md:min-h-full bg-white/10 backdrop-blur-sm md:relative flex-1 px-[2rem] py-[1rem] md:px-[4rem] lx:px-[5rem] flex justify-center flex-col gap-3 text-white md:text-black'>
                    <h2 className='leading-[2.5rem] md:leading-[3.4rem] text-center md:text-left'>Welcome to Connectify</h2>
                    <p className='text-sm md:text-lg text-center md:text-left '>Connect and grow with like-minded people.</p>
                    <div>
                    <Field className="txtbox" type="type" name="username" placeholder='Your username' />
                    <ErrorMessage className='errMsg' name="username" component="div" />
                    </div>
                    <div>
                    <Field className="txtbox" type="type" name="role" placeholder='your password' />
                    <ErrorMessage className='errMsg' name="role" component="div" />
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