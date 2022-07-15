import { Router } from 'express';
import clientesRouter from './clientesRouter';
import depositoRouter from './depositoRouter';
import retiradaRouter from './retiradaRouter';

const router = Router();

router.use('/clientes', clientesRouter);
router.use('/conta/deposito', depositoRouter);
router.use('/conta/saque', retiradaRouter);

export { router };
