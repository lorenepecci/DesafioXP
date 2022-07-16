import 'express-async-errors';
import { ICompraVenda } from '../interfaces/compraVenda';
import { AtivosModel } from '../models/ativosModel';
import { CompraVendaModel } from '../models/compraVendaModel';
import { CarteirasService } from './../services/carteirasService';
export class CompraVendaService {
  private _model: CompraVendaModel;
  private _modelAtivo: AtivosModel;
  private _serviceCarteira: CarteirasService;
  constructor(
    model = new CompraVendaModel(),
    ativo = new AtivosModel(),
    carteira = new CarteirasService()
  ) {
    this._model = model;
    this._modelAtivo = ativo;
    this._serviceCarteira = carteira;
  }
  async create(compraVenda: Omit<ICompraVenda, 'valor'>) {
    const { codCliente, codAtivo, qtdeAtivo, compra } = compraVenda;
    const findValorAtivo = await this._modelAtivo.getByAssets(
      compraVenda.codAtivo
    );
    if (findValorAtivo) {
      await this._serviceCarteira.handleCarteira({
        codCliente,
        codAtivo,
        qtdeAtivo,
        compra,
        valor: findValorAtivo.valorAtivo,
      });
      return await this._model.create({
        ...compraVenda,
        valor: findValorAtivo.valorAtivo,
      });
    }
    //throw error codAtivo nao existe.
  }
}
