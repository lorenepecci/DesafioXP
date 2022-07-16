import { Router } from 'express';
import { AtivosController } from '../controllers/ativosController';
import { ClientesController } from '../controllers/clientesController';

const router = Router();
const ativosController = new AtivosController();
const clientesController = new ClientesController();

router.post('/', ativosController.create);
router.get('/:cod', ativosController.getByCod);
/* router.get('/:cliente', clientesController.getByClienteAtivos); */

export default router;
