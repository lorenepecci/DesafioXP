import { Router } from 'express';
import { VendaController } from '../controllers/vendaController';
import { middlewareCompraVenda } from '../middlewares/middlewareCompraVenda';
import { CompraController } from './../controllers/compraController';

const router = Router();
const comprarController = new CompraController();
const venderController = new VendaController();

router.post('/comprar', middlewareCompraVenda, comprarController.create);
router.post('/vender', middlewareCompraVenda, venderController.create);

export default router;
