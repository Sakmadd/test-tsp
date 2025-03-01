import { Router } from 'express';
import ordersController from '../../controller/ordersController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.post('/', authenticate, ordersController.create);
router.put('/', authenticate, ordersController.update);
router.get('/', authenticate, ordersController.getTaskPM);
router.get('/task', authenticate, ordersController.getTaskOP);
router.post('/history', authenticate, ordersController.createHistory);
router.get('/:id', authenticate, ordersController.getOrder);
router.get('/:id/history', authenticate, ordersController.getHistories);
export default router;
