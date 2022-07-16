import { Router } from 'express';
import { authenticationMiddleware } from '../middlewares/autenticar';
import { validarDepositoRetirada } from '../middlewares/middlewareDepositoRetirada';
import ativosRouter from './ativosRouter';
import clientesRouter from './clientesRouter';
import compraVendaRouter from './compraVendaRouter';
import depositoRetiradaRouter from './depositoRetiradaRouter';
import loginRouter from './loginRouter';

const router = Router();

router.use('/clientes', clientesRouter);
router.use('/login', loginRouter);
router.use(
  '/conta',
  authenticationMiddleware,
  depositoRetiradaRouter
);
router.use( '/ativos', authenticationMiddleware, ativosRouter );

router.use(
  '/investimentos',
  authenticationMiddleware,
  compraVendaRouter
);

export { router };
