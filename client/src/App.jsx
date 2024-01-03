/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { HomePage, RegisterPage, LoginPage, RoomDetailsPage, DashBoardPage } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './context/authReducer';
import Page404 from './pages/Page404';
import { apiAllRooms, getRooms } from './context/roomsReducer';


const App = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const roomsData = useSelector(getRooms);
  useEffect(() => {
    if (roomsData.status === 'success')
      return;
    else
      dispatch(apiAllRooms());
  }, [dispatch, roomsData.status])

  // if (user.isLoggedIn) {
  //   return (
  //     <Routes>
  //       <Route path='/' element={<HomePage />} />
  //       <Route path='/addroom' element={<AddRoomPage />} />
  //       <Route path='*' element={<Page404 />} />
  //     </Routes>
  //   );
  // }



  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/room/:id' element={<RoomDetailsPage />} />
      <Route path='/dashboard' element={<DashBoardPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}

export default App