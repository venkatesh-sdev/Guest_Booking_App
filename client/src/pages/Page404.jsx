/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-dark-blue w-screen h-screen text-white flex justify-center items-center flex-col gap-5'>
            <h1 className=' text-5xl sm:text-8xl font-bold italic text-center'>404</h1>
            <h1 className=' text-3xl sm:text-6xl font-bold italic text-center'>{`Look's Like You Lost!`}</h1>
            <button onClick={() => navigate('/')} className='bg-white text-gray-900 px-5 py-2 text-lg sm:text-xl font-medium italic rounded-lg text-center'>Go Back To Home</button>
        </div>
    )
}

export default Page404