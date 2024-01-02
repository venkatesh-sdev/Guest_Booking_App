/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiAllRooms, getRooms } from '../context/roomsReducer';
import { HiHome } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

import ProfilePlaceHolder from '../assets/profile_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { Logout, getUser } from '../context/authReducer';

const HomePage = () => {
    const roomsData = useSelector(getRooms);
    const { user, isLoggedIn } = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (roomsData.status === 'success')
            return;
        else
            dispatch(apiAllRooms());
    }, [dispatch, roomsData.status])

    console.log(roomsData)
    console.log(isLoggedIn)

    return (
        <div className='bg-dark-blue w-screen h-full min-h-screen text-white'>
            {/* Nav */}
            <div
                className='sm:px-8 sm:py-5 p-2 bg-light-gray'
            >
                {/* Nav */}
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 pr-5'>
                        <HiHome className='text-blue-500' size={28} />
                        <h1 className='text-xl  font-medium p-0'>Homical</h1>
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
                        </div> : <button onClick={() => { dispatch(Logout()); navigate('/login') }} className='px-5 py-2 bg-light-blue rounded-md text-center'>
                            Logout
                        </button>}
                    </div>
                    <div className='pl-5'>
                        <button onClick={() => { isLoggedIn === 'true' ? navigate('dashboard') : navigate('/login') }} className='w-12 h-12 rounded-full overflow-hidden'>
                            <img className='w-full h-full object-cover' src={ProfilePlaceHolder} />
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
                            <div key={room._id} className='flex flex-col bg-light-gray rounded-2xl p-2' >
                                <div className='h-56 overflow-hidden rounded-lg'>
                                    {
                                        room.roomImages.length > 0 ? <img className='w-full h-full object-cover' src={room.roomImages[0]} /> : <img className='w-full h-full object-cover' src={ProfilePlaceHolder} />
                                    }
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
                        ) : <div>Loading</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage

