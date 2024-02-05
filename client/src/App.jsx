import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, RegisterPage, LoginPage, RoomDetailsPage, DashBoardPage } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import Page404 from './pages/Page404';
import { apiAllRooms } from './context/roomsReducer';
import AddRoomPage from './components/AddRoomPage';


const App = () => {
  const dispatch = useDispatch();
  const roomsData = useSelector(state => state.rooms);
  useEffect(() => {
    if (roomsData?.status === 'success')
      return;
    else
      dispatch(apiAllRooms());
  }, [dispatch, roomsData?.status])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/room/:id' element={<RoomDetailsPage />} />
      <Route path='/dashboard' element={<DashBoardPage />} />
      <Route path='/addroom' element={<AddRoomPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}

export default App