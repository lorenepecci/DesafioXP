import { Router } from 'express';
import { ClientesController } from '../controllers/clienteController';
import { DepositoRetiradaController } from '../controllers/depositoRetiradaController';
import { authenticationMiddleware } from '../middlewares/autenticar';
import { validarDepositoRetirada } from '../middlewares/middlewareDepositoRetirada';

const router = Router();
router.post(
  '/deposito',
  validarDepositoRetirada,
  new DepositoRetiradaController(true).create
);
router.post(
  '/saque',
  validarDepositoRetirada,
  new DepositoRetiradaController(false).create
);
router.get(
  '/:codCliente',
  authenticationMiddleware,
  new ClientesController().getSaldoCliente
);

export default router;
