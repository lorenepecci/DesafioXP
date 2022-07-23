import { Router } from 'express';
import { AtivosController } from '../controllers/ativoController';
import { autenticarMiddleware } from '../middlewares/autenticar';
import { middlewareAtivo } from '../middlewares/middlewareAtivo';
import { middlewareQuerysAtivos } from '../middlewares/middlewareQuerysAtivos';

const router = Router();
const ativosController = new AtivosController();

router.post(
  '/',
  autenticarMiddleware,
  middlewareAtivo,
  ativosController.create
);
router.get(
  '/',
  autenticarMiddleware,
  middlewareQuerysAtivos,
  ativosController.getAssetsOuCliente
);
router.get('/corretora', ativosController.getAtivosCorretora);

export default router;
