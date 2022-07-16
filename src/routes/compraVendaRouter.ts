import { Router } from 'express';
import { CompraVendaController } from '../controllers/compraVendaController';

const router = Router();
const compraVendaController = new CompraVendaController();

router.post('/', compraVendaController.create);

export default router;
