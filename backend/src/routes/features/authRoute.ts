import { Router } from 'express';
import authController from '../../controller/authController';
const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.getLoggedUser);

export default router;
