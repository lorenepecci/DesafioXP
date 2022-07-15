import { Router } from 'express';
import { ClientesController } from '../controllers/clientesController';
import { authenticationMiddleware } from '../middlewares/auth';

const router = Router();
const clientesController = new ClientesController();

router.post('/', authenticationMiddleware, clientesController.create);

export default router;
