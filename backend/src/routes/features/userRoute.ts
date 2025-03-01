import { Router } from 'express';
import userController from '../../controller/userController';
import { authenticate } from '../../middlewares/authenticate';
const router = Router();

router.get('/operators', authenticate, userController.getOperators);

export default router;
