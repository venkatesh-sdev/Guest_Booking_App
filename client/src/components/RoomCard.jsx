/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ProfilePlaceHolder from '../assets/profile_placeholder.png';
import React from 'react'

const RoomCard = ({room}) => {
  return (
      <div className='flex flex-col bg-light-gray rounded-2xl p-2' >
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
  )
}

export default RoomCard