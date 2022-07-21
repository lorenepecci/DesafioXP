import 'express-async-errors';
import { AtivosModel } from '../models/ativosModel';
import { CarteirasModel } from './../models/carteirasModel';

export class CarteirasService {
  private _model: CarteirasModel;
  private _modelAtivo: AtivosModel;
  constructor(model = new CarteirasModel(), ativos = new AtivosModel()) {
    this._model = model;
    this._modelAtivo = ativos;
  }
  async getClienteCarteira(codCliente: number) {
    const carteira = await this._model.getClienteCarteira(codCliente);
    const carteiraValor = carteira.map(async (ativo) => {
      const objAtivo = await this._modelAtivo.getByAssets(ativo.codAtivo);

      const valor = objAtivo?.valorAtivo;
      return { ...ativo, valor: Number(valor) };
    });
    const listaResposta = await Promise.all(carteiraValor);
    return listaResposta;
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
