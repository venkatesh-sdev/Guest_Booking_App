/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios'
import URLS from '../constants/apiUrls.js';
import { convertToBase64 } from '../constants/base64Converter';

const AddRoomPage = () => {
    // Input References
    const roomNameRef = useRef();
    const floorNumberRef = useRef();
    const noOfBedsRef = useRef();
    const rentPerDayRef = useRef();
    const minNoDays = useRef();
    const maxNoDays = useRef();
    const imagesRef = useRef();

    // States
    const [otherFeatures, setOtherFeatures] = useState([]);
    const [images, setImages] = useState([]);

    // Effects

    // Functions
    const handleRemoveOtherFeatures = (mainIndex) => {
        const removerFeatures = otherFeatures.filter((data, index) => index !== mainIndex);
        setOtherFeatures(removerFeatures)
    }

    const handleAddOtherFeatures = (value) => {
        for (let i = 0; i < otherFeatures.length; i++) {
            if (otherFeatures[i] == value) return;
        }
        setOtherFeatures(prev => [...prev, value])
    }

    const handleAddImages = (files) => {
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            newImages.push(files[i]);
        }
        setImages(newImages);
    }

    const handleRemoveImages = (mainIndex) => {
        const removedImages = images.filter((data, index) => index !== mainIndex);
        setImages(removedImages)
    }

    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTE1ZTlmNTMwYzg0ODIxNjU4YTQ1YyIsImlhdCI6MTcwNDA0OTMyMH0.odlyjvDuDZ8ZnsA1FDtdmoXTs0RCcIydk68cBbLKbt0';

    const createRoom = async () => {
        const data = {
            roomName: roomNameRef.current.value,
            floorNumber: floorNumberRef.current.value,
            numberOfBeds: noOfBedsRef.current.value,
            rentPerDay: rentPerDayRef.current.value,
            minimumRentDays: minNoDays.current.value,
            maximumRentDays: maxNoDays.current.value,
            otherFeatures: otherFeatures,
        }


        if (data.floorNumber && data.roomName && data.numberOfBeds && data.maximumRentDays && data.minimumRentDays && data.rentPerDay) {

            // Using File Storage
            // const formData = new FormData();
            // for (const [key, value] of Object.entries(data)) {
            //     formData.append(`${key}`, value);
            // }

            // images.map(image => { formData.append('files', image) })

            // Using MongoDB to Store Image
            const base64Images = [];
            const base64 = images.map((image) => convertToBase64(image))
            await Promise.all(base64).then(imageData => base64Images.push(imageData));

            // Request
            const result = await axios.post(URLS.apiCreateRoom, {
                ...data,
                roomImages: base64Images[0]
            }, {
                headers: { "Authorization": `Bearer ${testToken}`, }
            });
            console.log(result.data)
        }
    }

    return (
        <div className='w-screen min-h-screen h-full bg-dark-blue p-5 text-white flex flex-col justify-center items-center'>
            <div className='bg-light-gray sm:w-[500px] px-6 py-8 rounded-xl'>
                <h1 className='text-4xl font-medium italic pb-5'>Add Your Room</h1>
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="roomName">Room Name</label>
                    <input ref={roomNameRef} id='roomName' type="text" placeholder='Enter Room Name' className='text-md px-2 py-2 rounded-lg bg-white bg-opacity-10 ring-0 shadow-none' />
                </div>
                <div className='flex flex-col gap-2 mt-2'>
                    <label htmlFor="roomSize">Floor Number</label>
                    <input ref={floorNumberRef} id='roomSize' type="number" placeholder='Enter Floor Number' className='text-md px-2 py-2 rounded-lg bg-white bg-opacity-10 ring-0 shadow-none' />
                </div>
                <div className='flex flex-col gap-2 mt-2'>
                    <label htmlFor="numberOfBeds">Number Of Beds</label>
                    <input ref={noOfBedsRef} id='numberOfBeds' type="number" placeholder='Enter Number Of Beds' className='text-md px-2 py-2 rounded-lg bg-white bg-opacity-10 ring-0 shadow-none' min={1} max={4} />
                </div>
                <div className='flex flex-col gap-2 mt-2'>
                    <label htmlFor="rentPerDay">Rent Per Day</label>
                    <input ref={rentPerDayRef} id='rentPerDay' type="number" placeholder='Enter Rent Per Day' className='text-md px-2 py-2 rounded-lg bg-white bg-opacity-10 ring-0 shadow-none' />
                </div>
                <div className='flex flex-col gap-2 mt-2'>
                    <label htmlFor="minNoDays">Minimum Days</label>
                    <input ref={minNoDays} id='minNoDays' type="number" placeholder='Enter Minimum Days' className='text-md px-2 py-2 rounded-lg bg-white bg-opacity-10 ring-0 shadow-none' />
                </div>
                <div className='flex flex-col gap-2 mt-2'>
                    <label htmlFor="maxNoDays">Maximum Days</label>
                    <input ref={maxNoDays} id='maxNoDays' type="number" placeholder='Enter Maximum Days' className='text-md px-2 py-2 rounded-lg bg-white bg-opacity-10 ring-0 shadow-none' />
                </div>
                <div className='flex flex-col gap-2 mt-2'>
                    <label htmlFor='otherFeatures'>Other Features</label>
                    <select id='otherFeatures' onChange={(e) => handleAddOtherFeatures(e.target.value)} className='w-full bg-[#373948] bg-opacity-100 p-2 rounded-lg '>
                        <option value="AC">AC</option>
                        <option value="Fridge">Fridge</option>
                        <option value="Washing Machine">Washing Machine</option>
                        <option value="Tv">Tv</option>
                        <option value="Sofa">Sofa</option>
                    </select>
                    <div className='flex flex-wrap'>
                        {otherFeatures.map((data, index) => <div className='bg-[#373948] px-2 py-1 text-center rounded-lg flex gap-2 items-center mr-2' key={index}>
                            <p>{data}</p>
                            <button onClick={() => handleRemoveOtherFeatures(index)} className='text-red-500 text-xl' >x</button>
                        </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col gap-2 mt-2'>
                    <h1>Add Room Images</h1>
                    <label htmlFor="pictures" className='w-full cursor-pointer flex justify-center items-center h-40 rounded-lg bg-[#373948] gap-2'>
                        <IoCloudUploadOutline size={30} />
                        <h1 className="text-[20px] font-medium italic">Add Images</h1>
                    </label>
                    <div className='flex flex-wrap gap-2'>
                        {images.map((data, index) => <div className='bg-[#373948] px-2 py-1 text-center rounded-lg flex gap-2 items-center ' key={index}>
                            <p>{data.name}</p>
                            <button onClick={() => handleRemoveImages(index)} className='text-red-500 text-xl' >x</button>
                        </div>
                        )}
                    </div>
                    <input
                        onChange={(e) => handleAddImages(e.target.files)}
                        ref={imagesRef}
                        type="file" accept='image/x-png,image/gif,image/jpeg' id='pictures' multiple className='hidden' />
                </div>

                <button onClick={createRoom} className='bg-blue-700 w-full p-2 text-center rounded-lg mt-3'>Add Room</button>

            </div>
        </div>
    )
}

export default AddRoomPage


// {
//     progress: (progressEvent) => {
//         if (progressEvent.lengthComputable) {
//             console.log(progressEvent.loaded + ' ' + progressEvent.total);
//             this.updateProgressBarValue(progressEvent);
//         }
//     }
// }