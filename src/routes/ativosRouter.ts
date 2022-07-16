import { Router } from 'express';
import { AtivosController } from '../controllers/ativoController';
import { ClientesController } from '../controllers/clienteController';

const router = Router();
const ativosController = new AtivosController();
const clientesController = new ClientesController();

router.post('/', ativosController.create);
router.get('/:cod', ativosController.getByAssets);
/* router.get('/:cliente', clientesController.getByClienteAtivos); */

export default router;
