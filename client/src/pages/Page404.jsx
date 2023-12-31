/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-dark-blue w-screen h-screen text-white flex justify-center items-center flex-col gap-5'>
            <h1 className='text-8xl font-bold italic'>404</h1>
            <h1 className='text-6xl font-bold italic'>{`Look's Like You Lost!`}</h1>
            <button onClick={() => navigate('/')} className='bg-white text-gray-900 px-5 py-2 text-xl font-medium italic rounded-lg text-center'>Go Back To Home</button>
        </div>
    )
}

export default Page404