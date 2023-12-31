import { Router } from 'express'
import {
    signInController,
    signUpController
} from '../controllers/auth.controller.js';



const router = Router();

// SignUp 
router.post('/signup', signUpController);
// SignIn
router.post('/signin', signInController);


export default router;