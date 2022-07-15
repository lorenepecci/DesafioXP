import { Router } from 'express';
import { DepositoRetiradaController } from '../controllers/depositoRetiradaController';

const router = Router();
router.post('/', new DepositoRetiradaController(true).create);

export default router;
