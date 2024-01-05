/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, getUser } from '../context/authReducer'
import axios from 'axios';
import URLS from '../constants/apiUrls';
import RoomCard from './RoomCard';
import LoadingCard from './LoadingCard';

const WishList = () => {
    const [roomData, setRoomData] = useState([])
    const loadingAni = [1, 2, 3, 4, 5, 6, 7, 8]
    const token = useSelector(getToken)

    const getWishList = async () => {
        const result = await axios.get(URLS.apiWishList, { headers: { "Authorization": `Bearer ${token}`, } });
        console.log(result.data)
        setRoomData(result.data.rooms)
    }

    useEffect(() => {
        getWishList()
    }, [])

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5"
        >
            {
                roomData?.length > 0 ? roomData.map(room =>
                    <RoomCard room={room} key={room._id} />
                ) : loadingAni.map((data, index) =>
                    <LoadingCard key={index} />
                )
            }
        </div>
    )
}

export default WishList