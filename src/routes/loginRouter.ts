import { Router } from 'express';
import { LoginController } from '../controllers/loginController';
import { middlewareLogin } from '../middlewares/middlewareLogin';

const router = Router();
const loginController = new LoginController();
router.post('/', middlewareLogin, loginController.create);

export default router;
