/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import BookedRooms from '../components/BookedRooms';
import BookingHistory from '../components/BookingHistory';
import YourRooms from '../components/YourRooms';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../context/authReducer';
import { HiHome } from "react-icons/hi2";
import ProfilePlaceHolder from '../assets/profile_placeholder.png';

const navigations = [
    { dataComponent: <YourRooms />, navigationName: 'YourRooms' },
    { dataComponent: <BookedRooms />, navigationName: 'Booked Rooms' },
    { dataComponent: <BookingHistory />, navigationName: 'Booking History' },
]

const DashBoardPage = () => {
    const [navigationData, setNavigationData] = useState(
        navigations[0]
    );
    const { user, isLoggedIn } = useSelector(getUser);
    const navigate = useNavigate();

    return (
        <div className='bg-dark-blue w-screen h-full min-h-screen  text-white'>
            {/* DashBoard */}
            <div className='flex justify-between items-center   sm:px-[100px] py-2 bg-light-gray'>
                <div className='flex gap-2 items-center '>
                    <HiHome className='text-blue-500 ' size={28} />
                    <h1 className='text-xl pt-2 font-medium p-0'>Homical</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={() => { isLoggedIn === 'true' ? navigate('dashboard') : navigate('/login') }} className='w-10 h-10 rounded-2xl overflow-hidden'>
                        {user?.profilePic ? <img className='w-full h-full ojbect-cover' src={user.profilePic} /> : <img className='w-full h-full object-cover' src={ProfilePlaceHolder} />}
                    </button>
                    <h1 className='text-sm font-medium italic'>Hello User Name !!!</h1>
                </div>
            </div>
            {/* Nav */}
            <nav className='sm:px-[100px] px-2 py-4 flex gap-10 border border-transparent border-b-gray-600'>
                {navigations.map(data => <button onClick={() => setNavigationData(data)} key={data.navigationName} className={`text-lg ${data.navigationName === navigationData.navigationName ? "decoration-blue-600" : "decoration-transparent opacity-50"} hover:opacity-100 underline transition-all duration-700 underline-offset-[22px]`}>{data.navigationName}</button>)}
            </nav>
        </div>
    )
}

export default DashBoardPage