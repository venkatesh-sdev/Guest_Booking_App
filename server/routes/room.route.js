import { Router } from 'express'

const router = Router();
import { UpdateRoomController, DeleteRoomController, BookRoomController, CancelRoomController, GetAllRoomsController, GetRoomController, CreateRoomController } from '../controllers/room.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';


// Get All Rooms
router.get('/allrooms', GetAllRoomsController);
// Get Room
router.get('/:id', GetRoomController);
// CreateRoom
router.post('/create',verifyToken,CreateRoomController)
// UpdateRoom
router.put('/update/:id', verifyToken, UpdateRoomController);
// DeleteRoom
router.delete('/delete/:id', verifyToken, DeleteRoomController);
// BookRoom
router.put('/bookroom', verifyToken, BookRoomController);
// CancelRoom
router.put('/cancelroom', verifyToken, CancelRoomController);

export default router;