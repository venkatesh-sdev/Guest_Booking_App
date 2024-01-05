/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiLogin, getUser, resetStatus } from '../context/authReducer';

const LoginPage = () => {

    const user = useSelector(getUser);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.isLoggedIn === 'true') {
            dispatch(resetStatus());
            navigate('/')
        }
        if (user.status === 'user not available') {
            alert('User Not Exists');
            navigate('/register')
            dispatch(resetStatus())
        }

    }, [dispatch, navigate, user.isLoggedIn, user.status])

    const handleLogin = () => {
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        if (data.email && data.password) {
            dispatch(apiLogin(data))
        }

    }

    return (
        <div className='bg-dark-blue w-screen h-screen flex justify-center items-center p-2 text-white '>
            <div className='bg-light-gray px-6 py-5 rounded-xl  sm:w-[400px]'>
                <h1 className='text-2xl font-bold '>Login To Your Account</h1>
                <div className='flex flex-col gap-2 my-2 mt-7'>
                    <label htmlFor="email" className='text-sm font-medium  '>Your Email</label>
                    <input ref={emailRef} id='email' type="email" placeholder='Enter Your Email' className='bg-light-gray  p-2 rounded-lg border-none outline-none' />
                </div>
                <div className='flex flex-col gap-2 my-3'>
                    <label htmlFor="password" className='text-sm font-medium  '>Password</label>
                    <input ref={passwordRef} id='password' type="password" placeholder='********' className='bg-light-gray   p-2 rounded-lg border-none outline-none' />
                </div>
                <div className='flex justify-end items-center my-3'>
                    <button className='text-blue-500 text-md hover:underline decoration-blue-500 '>Forgot Password?</button>
                </div>
                <button
                    onClick={handleLogin}
                    className='w-full bg-blue-700 text-white rounded-lg text-center py-2 my-2 transition-all ease-in hover:bg-blue-800 duration-200'>
                    {user.status === 'pending' ? "...please wait" : "Login"}
                </button>
                <p className="text-sm font-light mt-2 text-gray-400">
                    Don’t have an account yet?
                    <button onClick={() => navigate('/register')} className="font-medium  hover:underline text-blue-500" >Sign Up</button>
                </p>
            </div>
        </div>
    )
}

export default LoginPage