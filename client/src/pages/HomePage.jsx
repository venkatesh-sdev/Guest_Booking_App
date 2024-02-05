/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiAllRooms, getRooms, getRoomsStatus } from '../context/roomsReducer';
import { HiHome } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

import ProfilePlaceHolder from '../assets/profile_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { Logout, getUser } from '../context/authReducer';
import RoomCard from '../components/RoomCard';
import LoadingCard from '../components/LoadingCard';

const HomePage = () => {
    const roomsStatus = useSelector(getRoomsStatus);
    const roomsData = useSelector(getRooms);
    const { user, isLoggedIn } = useSelector(getUser);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (roomsStatus === 'success' && roomsData.length === 0) {
            setIsLoaded(true)
            return;
        }
        else {
            dispatch(apiAllRooms());
        }
    }, [dispatch, roomsData, roomsStatus]);

    const loadingAni = [1, 2, 3, 4, 5, 6, 7, 8];


    return (
        <div className='bg-dark-blue w-screen h-full min-h-screen text-white'>
            {/* Nav */}
            <div
                className='sm:px-8 sm:py-5 p-2 bg-light-gray'
            >
                {/* Nav */}
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 pr-5 items-center '>
                        <HiHome className='text-blue-500 ' size={28} />
                        <h1 className='text-xl pt-2 font-medium p-0'>Homical</h1>
                    </div>
                    {/* Search and Filter */}
                    <div className='border-transparent hidden md:flex w-full border-l-slate-500 border-r-slate-500 border px-5  justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <FiSearch color='#fff' size={24} />
                            <input type="text" className='bg-transparent outline-none ring-0 border-none py-1  lg:w-[300px] text-sm' placeholder='Search for Homes,Apartments,... ' />
                        </div>
                        {isLoggedIn === 'false' ? <div className='flex gap-2'>
                            <button onClick={() => navigate('/login')} className='px-5 py-2 bg-light-blue rounded-md text-center'>
                                Login
                            </button>
                            <button onClick={() => navigate('/register')} className='px-5 py-2 bg-light-blue rounded-md text-center'>
                                Register
                            </button>
                        </div> : <div className='gap-2 flex items-center'>
                            <button onClick={() => {
                                dispatch(Logout());
                                navigate('/login');
                            }} className='px-5 py-2 bg-light-blue rounded-md text-center'>
                                Logout
                            </button>
                            <button onClick={() => {
                                navigate('/addroom');
                            }} className='px-5 py-2 bg-light-blue rounded-md text-center'>
                                Add Product
                            </button>
                        </div>}
                    </div>
                    <div className='pl-5'>
                        <button onClick={() => { isLoggedIn === 'true' ? navigate('dashboard') : navigate('/login') }} className='w-12 h-12 rounded-full overflow-hidden'>
                            {user?.profilePic ? <img className='w-full h-full ojbect-cover' src={user.profilePic} /> : <img className='w-full h-full object-cover' src={ProfilePlaceHolder} />}
                        </button>
                    </div>
                </div>
                <div className='md:hidden flex gap-2 items-center py-2'>
                    <FiSearch color='#fff' size={24} />
                    <input type="text" className='bg-transparent outline-none ring-0 border-none py-1 w-full text-sm' placeholder='Search for Homes,Apartments,... ' />
                </div>
            </div>
            {/* Rooms */}
            <div className='px-5 py-5'>
                <div className='flex gap-2 items-center'>
                    <h1 className='text-2xl font-medium '>Rooms</h1>
                    <p className='text-light-white text-sm'> {"(" + roomsData.length + " Results)"}</p>
                </div>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5"
                >
                    {
                        roomsData.length > 0 ? roomsData.map(room =>
                            <RoomCard room={room} key={room._id} />
                        ) : isLoaded ? <h1 className='text-2xl font-medium text-white italic'>No Room Available Yet</h1> : loadingAni.map((data, index) =>
                            <LoadingCard key={index} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage

