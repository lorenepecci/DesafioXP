import { Router } from 'express';
import clientesRouter from './clientesRouter';

const router = Router();

router.use( '/clientes', clientesRouter );

export { router };