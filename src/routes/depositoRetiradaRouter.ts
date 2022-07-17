import { Router } from 'express';
import { ClientesController } from '../controllers/clienteController';
import { DepositoController } from '../controllers/depositoController';
import { RetiradaController } from '../controllers/retiradaController';
import { autenticarMiddleware } from '../middlewares/autenticar';
import { middlewareDepositoRetirada } from '../middlewares/middlewareDepositoRetirada';

const router = Router();
router.post(
  '/deposito',
  middlewareDepositoRetirada,
  new DepositoController().create
);
router.post(
  '/saque',
  middlewareDepositoRetirada,
  new RetiradaController().create
);
router.get(
  '/:codCliente',
  autenticarMiddleware,
  new ClientesController().getSaldoCliente
);

export default router;
