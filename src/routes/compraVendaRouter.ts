import { Router } from 'express';
import { RelatorioController } from '../controllers/relatorioController';
import { VendaController } from '../controllers/vendaController';
import { middlewareCompraVenda } from '../middlewares/middlewareCompraVenda';
import { middlewareQueryRelatorio } from '../middlewares/middlewareQueryRelatorio';
import { CompraController } from './../controllers/compraController';

const router = Router();
const comprarController = new CompraController();
const venderController = new VendaController();
const relatorioController = new RelatorioController();

router.post('/comprar', middlewareCompraVenda, comprarController.create);
router.post('/vender', middlewareCompraVenda, venderController.create);
router.get(
  '/relatorio',
  middlewareQueryRelatorio,
  relatorioController.getRelatorio
);

export default router;
