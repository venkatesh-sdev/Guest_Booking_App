/* eslint-disable no-unused-vars */
import React from 'react'

const LoadingCard = () => {
  return (
      <div className='flex flex-col bg-light-gray rounded-2xl p-2 ' >
          <div className='h-56 overflow-hidden rounded-lg'>
              <div className='w-full h-full bg-medium-gray rounded-lg animate-pulse'></div>
          </div>
          <div className='px-2 flex justify-between items-end py-2'>
              <div className=' gap-1 flex flex-col'>
                  <h1 className='w-[100px] h-[24px] bg-medium-gray rounded-lg animate-pulse'></h1>
                  <p className='text-light-white text-xs w-[150px] h-[16px] bg-medium-gray rounded-lg animate-pulse'></p>
              </div>
              <div className='flex gap-1 items-center'>
                  <p className='w-[50px] h-[24px] bg-medium-gray rounded-lg animate-pulse'></p>
                  <p className='text-light-white self-end text-[10px] italic'>/ PerDay</p>
              </div>
          </div>
      </div>
  )
}

export default LoadingCard