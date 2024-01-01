/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiAllRooms, getRooms } from '../context/roomsReducer';

const HomePage = () => {
    const roomsData = useSelector(getRooms);
    const dispatch = useDispatch();
    useEffect(() => {
        if (roomsData.status === 'success')
            return;
        else
            dispatch(apiAllRooms());
    }, [dispatch, roomsData.status])


    return (
        <div className='bg-dark-blue flex justify-center items-center w-screen h-screen text-white'>
            {/* Nav */}
            {/* Search and Filter */}
            <h1 className='text-2xl font-bold italic'>Home</h1>
            {/* Rooms */}
        </div>
    )
}

export default HomePage