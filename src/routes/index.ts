import { Router } from 'express';
import { authenticationMiddleware } from '../middlewares/autenticar';
import ativosRouter from './ativosRouter';
import clientesRouter from './clientesRouter';
import compraVendaRouter from './compraVendaRouter';
import depositoRouter from './depositoRouter';
import loginRouter from './loginRouter';
import retiradaRouter from './retiradaRouter';

const router = Router();

router.use('/clientes', clientesRouter);
router.use('/conta', clientesRouter);
router.use('/login', loginRouter);
router.use('/conta/deposito', authenticationMiddleware, depositoRouter);
router.use('/conta/saque', authenticationMiddleware, retiradaRouter);
router.use('/ativos', authenticationMiddleware, ativosRouter);
router.use(
  '/investimentos/comprar',
  authenticationMiddleware,
  compraVendaRouter
);

export { router };
