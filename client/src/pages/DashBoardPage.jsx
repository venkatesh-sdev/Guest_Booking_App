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
import Profile from '../components/Profile';
import WishList from '../components/WishList';

import Select from 'react-select'
import { colourStyles } from '../constants/customSelectStyle'


const navigations = [
    { dataComponent: <Profile />, value: 'Profile', label: 'Profile', index: 0 },
    { dataComponent: <WishList />, value: 'WishList', label: 'WishList', index: 1 },
    { dataComponent: <YourRooms />, value: 'YourProducts', label: 'YourProducts', index: 2 },
    { dataComponent: <BookedRooms />, value: 'Booked Products', label: 'Booked Products', index: 3 },
    { dataComponent: <BookingHistory />, value: 'Booking History', label: 'Booking History', index: 4 },
]


const DashBoardPage = () => {
    const [navigationData, setNavigationData] = useState(
        navigations[0]
    );
    const { user } = useSelector(getUser);


    const NavigationList = () => {
        return navigations.map(
            data =>
                <button
                    onClick={() => setNavigationData(data)}
                    key={data.value}
                    className={`text-lg ${data.value === navigationData.value ? "decoration-blue-600" : "decoration-transparent opacity-50"} hover:opacity-100 underline transition-all min-w-fit duration-700 underline-offset-[22px]`}>
                    {data.value}
                </button>
        )
    }


    return (
        <div
            className='bg-dark-blue w-screen h-full min-h-screen  text-white'>
            {/* DashBoard */}
            <div className='flex justify-between px-2 items-center min-[870px]:px-[100px] py-2 bg-light-gray'>
                <div
                    className='flex gap-2 items-center '>
                    <HiHome className='text-blue-500 ' size={28} />
                    <h1 className='text-xl pt-2 font-medium p-0'>Homical</h1>
                </div>
                <div
                    className='sm:flex hidden items-center gap-2'>
                    <button className='w-10 h-10 rounded-2xl overflow-hidden'>
                        {
                            user?.profilePic ?
                                <img
                                    className='w-full h-full ojbect-cover'
                                    src={user.profilePic}
                                /> :
                                <img
                                    className='w-full h-full object-cover'
                                    src={ProfilePlaceHolder}
                                />}
                    </button>
                    <h1
                        className='text-sm font-medium italic'
                    >Hello {user.userName} !!!</h1>
                </div>
            </div>
            {/* Nav */}
            <div className='hidden min-[870px]:flex px-[100px]  py-4  gap-10 border border-transparent border-b-gray-600'>
                {NavigationList()}
            </div>

            {/* Mobile Nav */}
            <div className='w-[200px] mx-2 min-[870px]:hidden h-[40px] bg-light-gray rounded-lg mt-2'>
                <Select
                    value={navigationData}
                    options={navigations}
                    styles={colourStyles}
                    isSearchable={false}
                    onChange={(value) => { setNavigationData(navigations[value.index]) }}
                />
            </div>

            <div
                className='px-2 min-[870px]:px-[100px] py-2 '
            >
                {
                    navigationData.dataComponent
                }
            </div>
        </div>
    )
}

export default DashBoardPage