import { Router } from 'express';
import { authUser, registerUser, googleAuth } from '../controllers/auth.controller';

const router = Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/google', googleAuth);

export default router;
