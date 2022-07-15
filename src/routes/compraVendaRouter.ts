import { Router } from 'express';
import { CompraVendaController } from '../controllers/compraVenda';

const router = Router();
const compraVendaController = new CompraVendaController();

router.post('/', compraVendaController.create);

export default router;
