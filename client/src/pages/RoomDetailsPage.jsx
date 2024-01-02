/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getRooms } from '../context/roomsReducer';

const RoomDetailsPage = () => {
    const { id } = useParams();
    useEffect(()=>{

    },[])
    return (
        <div className='w-screen h-full min-h-screen bg-dark-blue text-white'>RoomDetailsPage</div>
    )
}

export default RoomDetailsPage