import { Router } from 'express';
import { ClientesController } from '../controllers/clientesController';

const router = Router();

router.post( '/', ClientesController.create );

export default router ;