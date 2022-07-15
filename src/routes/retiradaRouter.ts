import { Router } from 'express';
import { DepositoRetiradaController } from '../controllers/depositoRetirada';

const router = Router();
const depositoRetiradaController = new DepositoRetiradaController(false);
router.post('/', depositoRetiradaController.create);

export default router;
