import { Router } from 'express';
import { autenticarMiddleware } from '../middlewares/autenticar';
import ativosRouter from './ativosRouter';
import clientesRouter from './clientesRouter';
import compraVendaRouter from './compraVendaRouter';
import depositoRetiradaRouter from './depositoRetiradaRouter';
import loginRouter from './loginRouter';

const router = Router();

router.use('/clientes', clientesRouter);
router.use('/login', loginRouter);
router.use('/conta', autenticarMiddleware, depositoRetiradaRouter);
router.use('/ativos', autenticarMiddleware, ativosRouter);
router.use('/investimentos', autenticarMiddleware, compraVendaRouter);

export { router };
