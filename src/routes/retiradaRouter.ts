import { Router } from 'express';
import { DepositoRetiradaController } from '../controllers/depositoRetiradaController';

const router = Router();
router.post('/', new DepositoRetiradaController(false).create);

export default router;
