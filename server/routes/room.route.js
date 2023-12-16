import { Router } from 'express'

const router = Router();
import { CreateRoomController, UpdateRoomController, DeleteRoomController } from '../controllers/room.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';


// CreateRoom
router.post('/create', verifyToken, CreateRoomController);
// UpdateRoom
router.put('/update/:id', verifyToken, UpdateRoomController);
// DeleteRoom
router.delete('/delete/:id', verifyToken, DeleteRoomController);

export default router;