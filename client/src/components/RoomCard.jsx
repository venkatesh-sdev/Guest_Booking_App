/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import ProfilePlaceHolder from '../assets/profile_placeholder.png';
import React from 'react'
import apiUrls from '../constants/apiUrls';
import { useSelector } from 'react-redux';
import { getToken } from '../context/authReducer';
import { IoHeart } from 'react-icons/io5';

const RoomCard = ({ room }) => {
    const token = useSelector(getToken)
    const addToWishList = async () => {
        const { data } = await axios.put(
            `${apiUrls.apiWishList}/${room._id}`,
            {},
            { headers: { "Authorization": `Bearer ${token}`, } }
        )
        console.log(data)
    }
    return (
        <div className='flex flex-col bg-light-gray rounded-2xl p-2' >
            <div className='h-56 overflow-hidden rounded-lg relative'>
                {
                    room.roomImages.length > 0 ? <img className='w-full h-full object-cover' src={room.roomImages[0]} /> : <img className='w-full h-full object-cover' src={ProfilePlaceHolder} />
                }
                <button className='absolute top-2 left-2 bg-blue-600 p-2 rounded-lg' onClick={addToWishList}><IoHeart /></button>
            </div>
            <div className='px-2 flex justify-between items-end py-2'>
                <div className=' gap-1 flex flex-col'>
                    <h1>{room.roomName}</h1>
                    <p className='text-light-white text-xs'>{room.address || "1930 St, LaSanta Alley, 21"}</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p className='font-medium'>$ {room.rentPerDay}</p>
                    <p className='text-light-white self-end text-[10px] italic'>/ PerDay</p>
                </div>
            </div>
        </div>
    )
}

export default RoomCard