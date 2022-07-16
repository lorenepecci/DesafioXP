import 'express-async-errors';
import HttpException from '../helpers/erroClasse';
import { ICompraVenda } from '../interfaces/compraVenda';
import { AtivosModel } from '../models/ativosModel';
import { CompraVendaModel } from '../models/compraVendaModel';
import { CarteirasService } from './../services/carteirasService';
export class VendaService {
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
    const encontrarAtivo = await this._modelAtivo.getByAssets(
      compraVenda.codAtivo
    );

    if (encontrarAtivo) {
      if (encontrarAtivo?.qtdeAtivo < qtdeAtivo) {
        throw new HttpException(
          400,
          'Essa quantidade é maior que a quantidade disponível na corretora'
        );
      }
    /*   await this._serviceCarteira.handleCarteira({
        codCliente,
        codAtivo,
        qtdeAtivo,
        compra,
        valor: encontrarAtivo.valorAtivo,
      }); */
      return await this._model.create({
        ...compraVenda,
        valor: encontrarAtivo.valorAtivo,
      });
    }

    throw new HttpException(401, 'Este codAtivo não existe.');
  }
}
