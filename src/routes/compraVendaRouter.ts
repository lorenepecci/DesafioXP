import { Router } from 'express';
import { VendaController } from '../controllers/vendaController';
import { validarCompraVenda } from '../middlewares/middlewareCompraVenda';
import { CompraController } from './../controllers/compraController';

const router = Router();
const comprarController = new CompraController();
const venderController = new VendaController();

router.post('/comprar', validarCompraVenda, comprarController.create);
router.post('/vender', validarCompraVenda, venderController.create);

export default router;
