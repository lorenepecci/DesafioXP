import { Router } from 'express';
import { ClientesController } from '../controllers/clienteController';

const router = Router();
const clientesController = new ClientesController();

router.post('/', clientesController.create);

export default router;
