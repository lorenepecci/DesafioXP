import { Router } from 'express';
import { AtivosController } from '../controllers/ativoController';
import { middlewareAtivo } from '../middlewares/middlewareAtivo';
import { middlewareQuerysAtivos } from '../middlewares/middlewareQuerysAtivos';

const router = Router();
const ativosController = new AtivosController();

router.post('/', middlewareAtivo, ativosController.create);
router.get('/', middlewareQuerysAtivos, ativosController.getAssetsOuCliente);

export default router;
