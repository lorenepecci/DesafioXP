import { Router } from 'express';
import { DepositoRetiradaController } from '../controllers/depositoRetiradaController';

const router = Router();
const depositoRetiradaController = new DepositoRetiradaController(true);
router.post('/', depositoRetiradaController.create);

export default router;
