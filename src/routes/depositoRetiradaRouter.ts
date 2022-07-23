import { Router } from 'express';
import { ClientesController } from '../controllers/clienteController';
import { DepositoController } from '../controllers/depositoController';
import { ExtratoController } from '../controllers/extratoController';
import { RetiradaController } from '../controllers/retiradaController';
import { middlewareDepositoRetirada } from '../middlewares/middlewareDepositoRetirada';
import { middlewareQueryRelatorio } from '../middlewares/middlewareQueryRelatorio';

const router = Router();
router.get(
  '/extrato',
  middlewareQueryRelatorio,
  new ExtratoController().getExtrato
);
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
router.get('/:codCliente', new ClientesController().getSaldoCliente);

export default router;
