/* eslint-disable no-unused-vars */
import React from 'react'
import { FiDelete, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ProfilePlaceHolder from '../assets/profile_placeholder.png';
import { useSelector } from 'react-redux';
import { getUser } from '../context/authReducer';


const Profile = () => {
    const { user } = useSelector(getUser);

    return (
        <div className='max-[750px]:items-center flex gap-5 justify-center max-[750px]:flex-col'>
            <div className='flex-col flex gap-2 max-[520px]:mt-2'>
                <div className='bg-medium-gray overflow-hidden rounded-xl w-[200px] h-[250px]'>
                    <img src={ProfilePlaceHolder} alt="Profile" className='w-full h-full object-cover' />
                </div>
                <div className='flex gap-2'>
                    <button className='rounded-lg px-5 py-2 text-md bg-blue-600 flex gap-2 items-center'>
                        <FiEdit size={20} />
                    </button>
                    <button className='rounded-lg px-5 py-2 text-md bg-red-600 flex gap-2 items-center'>
                        <MdDelete size={20} />
                    </button>
                </div>
            </div>
            <div className='overflow-scroll min-[520px]:w-[500px] w-full  bg-medium-gray rounded-xl p-5 flex flex-col gap-3'>
                <div className='flex gap-5 max-[520px]:gap-1 max-[520px]:flex-col'>
                    <h1 className='text-md min-w-[100px]'>UserName</h1>
                    <h1 className='max-[520px]:hidden'>:</h1>
                    <h1 className='max-[520px]:ml-2'>{user.userName}</h1>
                </div>
                <div className='flex gap-5 max-[520px]:gap-1 max-[520px]:flex-col'>
                    <h1 className='text-md min-w-[100px]'>Email</h1>
                    <h1 className='max-[520px]:hidden'>:</h1>
                    <h1 className='max-[520px]:ml-2'>{user.email}</h1>
                </div>
                <div className='flex gap-5 max-[520px]:gap-1 max-[520px]:flex-col'>
                    <h1 className='text-md min-w-[100px]'>Address</h1>
                    <h1 className='max-[520px]:hidden'>:</h1>
                    <h1 className='max-[520px]:ml-2'>Address of User Will Be Displayed Here and it used to show the users</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile