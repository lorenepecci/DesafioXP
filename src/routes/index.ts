import { Router } from 'express';
import { autenticarMiddleware } from '../middlewares/autenticar';
import ativosRouter from './ativosRouter';
import clientesRouter from './clientesRouter';
import contaRouter from './contaRouter';
import investimentosRouter from './InvestimentosRouter';
import loginRouter from './loginRouter';

const router = Router();

router.use('/clientes', clientesRouter);
router.use('/login', loginRouter);
router.use('/conta', autenticarMiddleware, contaRouter);
router.use('/ativos', ativosRouter);
router.use('/investimentos', autenticarMiddleware, investimentosRouter);

export { router };
