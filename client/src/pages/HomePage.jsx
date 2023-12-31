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
        <div className='bg-dark-blue w-screen h-screen text-white'>
            {/* Nav */}
            {/* Search and Filter */}
            {/* Rooms */}
        </div>
    )
}

export default HomePage