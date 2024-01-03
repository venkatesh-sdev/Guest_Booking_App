/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiRegister, getUser, resetStatus } from '../context/authReducer';

const RegisterPage = () => {
    const user = useSelector(getUser)
    const dispatch = useDispatch();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.status === 'registered') {
            dispatch(resetStatus());
            navigate('/login');
            console.log('registered')
        }
    }, [dispatch, navigate, user.status])



    const handleRegister = async () => {

        if (confirmPasswordRef.current.value === passwordRef.current.value) {
            const data = {
                userName: userNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            dispatch(apiRegister(data))
        }

    }


    return (
        <div className='bg-dark-blue w-screen h-screen text-white flex justify-center items-center'>

            <div className='bg-light-gray px-6 py-5 rounded-xl  sm:w-[400px]'>
                <h1 className='text-2xl font-bold '>Create Your Account</h1>
                <div className='flex flex-col gap-2 my-2 mt-7'>
                    <label htmlFor="username" className='text-sm font-medium  '>UserName</label>
                    <input ref={userNameRef} id='username' type="text" placeholder='Enter UserName' className='bg-light-gray  p-2 rounded-lg border-none outline-none' />
                </div>
                <div className='flex flex-col gap-2 my-3'>
                    <label htmlFor="email" className='text-sm font-medium  '> Email</label>
                    <input ref={emailRef} id='email' type="email" placeholder='Enter  Email' className='bg-light-gray  p-2 rounded-lg border-none outline-none' />
                </div>
                <div className='flex flex-col gap-2 my-3'>
                    <label htmlFor="password" className='text-sm font-medium  '>Password</label>
                    <input ref={passwordRef} id='password' type="password" placeholder='********' className='bg-light-gray   p-2 rounded-lg border-none outline-none' />
                </div>
                <div className='flex flex-col gap-2 my-3'>
                    <label htmlFor="confirmpassword" className='text-sm font-medium  '>Confirm Password</label>
                    <input ref={confirmPasswordRef} id='confirmpassword' type="password" placeholder='********' className='bg-light-gray   p-2 rounded-lg border-none outline-none' />
                </div>
                <button onClick={handleRegister} className='w-full bg-blue-700 text-white rounded-lg text-center py-2 my-2 transition-all ease-in hover:bg-blue-800 duration-200'>{user.status === 'pending' ? "...please wait" : "Register"}</button>
                <p className="text-sm font-light mt-2 text-gray-400">
                    Alreay Have An Account!
                    <button onClick={() => navigate('/login')} className="font-medium  hover:underline text-blue-500 ml-2" >Sign In</button>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage