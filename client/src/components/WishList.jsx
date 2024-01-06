/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../context/authReducer'

import RoomCard from './RoomCard';

const WishList = () => {
    const user = useSelector(getUser);
    const roomData = user.user.wishlist;
    
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5"
        >
            {
                roomData?.length > 0 ? roomData.map(room =>
                    <RoomCard room={room} key={room._id} />
                ) : <div>WishList is Empty</div>
            }
        </div>
    )
}

export default WishList