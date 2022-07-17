import { Router } from 'express';
import { ClientesController } from '../controllers/clienteController';
import { middlewareCliente } from '../middlewares/middlewareCliente';

const router = Router();
const clientesController = new ClientesController();

router.post('/', middlewareCliente, clientesController.create);

export default router;
