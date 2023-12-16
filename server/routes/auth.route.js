import { Router } from 'express'

const router = Router();
import {
    HouseOwnerSignInController,
    HouseOwnerSignUpController,
    CustomerSignInController,
    CustomerSignUpController
} from '../controllers/auth.controller.js';

// House Owner SignUp 
router.post('/houseowner/signup', HouseOwnerSignUpController);
// House Owner SignIn
router.post('/houseowner/signin', HouseOwnerSignInController);

// Customer SignUp 
router.post('/customer/signup', CustomerSignUpController);
// Customer SignIn
router.post('/customer/signin', CustomerSignInController);

export default router;