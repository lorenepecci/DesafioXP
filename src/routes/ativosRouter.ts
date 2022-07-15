import { Router } from 'express';
import { AtivosController } from '../controllers/ativosController';

const router = Router();
const ativosController = new AtivosController();

router.post('/', ativosController.create);

export default router;
