import { Router } from 'express';
import { ClientesController } from '../controllers/clienteController';

const router = Router();
const clientesController = new ClientesController();

router.post('/', clientesController.create);
router.get('/:codCliente', clientesController.getSaldoCliente);

export default router;
