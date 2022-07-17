import { Router } from 'express';
import { AtivosController } from '../controllers/ativoController';
import { ClientesController } from '../controllers/clienteController';
import { middlewareAtivo } from '../middlewares/middlewareAtivo';

const router = Router();
const ativosController = new AtivosController();
const clientesController = new ClientesController();

router.post('/', middlewareAtivo, ativosController.create);
router.get('/:codAtivo', ativosController.getByAssets);

export default router;
