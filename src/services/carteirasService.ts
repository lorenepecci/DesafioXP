import 'express-async-errors';
import { CarteirasModel } from './../models/carteirasModel';

export class CarteirasService {
  private _model: CarteirasModel;
  constructor(model = new CarteirasModel()) {
    this._model = model;
  }
  async create() {
    //throw error codAtivo nao existe.
  }
  async handleCarteira(
    codAtivo: number,
    codCliente: number,
    qtdeAtivo: number
  ) {
    const getClienteCarteiraAtivo = await this._model.getClienteCarteiraAtivo(
      codAtivo,
      codCliente
    );
    console.log(getClienteCarteiraAtivo, 'gettt');
    if (!getClienteCarteiraAtivo) {
      await this._model.create({ codAtivo, codCliente, qtdeAtivo });
    }
  }
}
