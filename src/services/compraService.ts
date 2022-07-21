import { Decimal } from '@prisma/client/runtime';
import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { ICompraVenda } from '../interfaces/compraVenda';
import { AtivosModel } from '../models/ativosModel';
import { ClientesModel } from '../models/clientesModel';
import { CompraVendaModel } from '../models/compraVendaModel';
import { CarteirasService } from './../services/carteirasService';

export class CompraService {
  private _model: CompraVendaModel;
  private _modelAtivo: AtivosModel;
  private _serviceCarteira: CarteirasService;
  private _modelCliente: ClientesModel;
  constructor(
    model = new CompraVendaModel(),
    ativo = new AtivosModel(),
    carteira = new CarteirasService(),
    cliente = new ClientesModel()
  ) {
    this._model = model;
    this._modelAtivo = ativo;
    this._serviceCarteira = carteira;
    this._modelCliente = cliente;
  }
  async create(compra: Omit<ICompraVenda, 'valor'>) {
    const { codCliente, codAtivo, qtdeAtivo, tipoCompra } = compra;
    const encontrarAtivo = await this._modelAtivo.getByAssets(compra.codAtivo);
    const encontrarCliente = await this._modelCliente.getByClienteCod(
      codCliente
    );
    if (!encontrarAtivo) {
      throw new ErroHttp(401, 'Este Ativo não existe.');
    }
    if (encontrarAtivo.qtdeAtivo < qtdeAtivo) {
      throw new ErroHttp(
        400,
        'Essa quantidade é maior que a quantidade disponível na corretora'
      );
    }
    const saldoCliente = encontrarCliente?.saldo;
    const valorCompra = Number(encontrarAtivo.valorAtivo) * Number(qtdeAtivo);
    if (valorCompra > Number(saldoCliente)) {
      throw new ErroHttp(400, 'Não há saldo disponível para esta compra.');
    }
    const saldoAtual = Number(saldoCliente) - valorCompra;
    await this._modelCliente.updateSaldo(codCliente, saldoAtual);

    await this._serviceCarteira.handleCarteira(
      tipoCompra,
      codAtivo,
      codCliente,
      qtdeAtivo
    );
    const quantidadeAtualAtivo = Number(encontrarAtivo.qtdeAtivo) - qtdeAtivo;
    await this._modelAtivo.updateQuantidadeAtivo(
      codAtivo,
      quantidadeAtualAtivo
    );
    return await this._model.create({
      ...compra,
      valor: new Decimal(encontrarAtivo.valorAtivo),
    });
  }
}
