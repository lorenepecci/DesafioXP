import { Router } from 'express';
import clientesRouter from './clientesRouter';
import depositoRouter from './depositoRouter';
import loginRouter from './loginRouter';
import retiradaRouter from './retiradaRouter';

const router = Router();

router.use('/clientes', clientesRouter);
router.use('/login', loginRouter);
router.use('/conta/deposito', depositoRouter);
router.use('/conta/saque', retiradaRouter);

export { router };
