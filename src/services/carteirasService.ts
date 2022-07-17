import 'express-async-errors';
import { CarteirasModel } from './../models/carteirasModel';

export class CarteirasService {
  private _model: CarteirasModel;
  constructor(model = new CarteirasModel()) {
    this._model = model;
  }

  async getClienteCarteiraAtivo(codAtivo: number, codCliente: number) {
    return this._model.getClienteCarteiraAtivo(codAtivo, codCliente);
  }
  async handleCarteira(
    tipoCompra: boolean,
    codAtivo: number,
    codCliente: number,
    qtdeAtivo: number
  ) {
    const getClienteCarteiraAtivo = await this._model.getClienteCarteiraAtivo(
      codAtivo,
      codCliente
    );
    if (tipoCompra === true) {
      if (!getClienteCarteiraAtivo) {
        await this._model.create({ codAtivo, codCliente, qtdeAtivo });
      } else {
        const qntAtivoAtual = getClienteCarteiraAtivo.qtdeAtivo + qtdeAtivo;
        await this._model.update(codAtivo, codCliente, qntAtivoAtual);
      }
    }
    if (tipoCompra === false && getClienteCarteiraAtivo) {
      const qntAtivoAtual = getClienteCarteiraAtivo.qtdeAtivo - qtdeAtivo;
      if (qntAtivoAtual === 0) {
        await this._model.delete(codAtivo, codCliente);
      }
      await this._model.update(codAtivo, codCliente, qntAtivoAtual);
    }
  }
}
