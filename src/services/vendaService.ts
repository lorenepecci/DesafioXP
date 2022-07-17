import { Decimal } from '@prisma/client/runtime';
import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { ICompraVenda } from '../interfaces/compraVenda';
import { AtivosModel } from '../models/ativosModel';
import { ClientesModel } from '../models/clientesModel';
import { CompraVendaModel } from '../models/compraVendaModel';
import { CarteirasService } from './../services/carteirasService';
export class VendaService {
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
  async create(venda: Omit<ICompraVenda, 'valor'>) {
    const { codCliente, codAtivo, qtdeAtivo, tipoCompra } = venda;
    const encontrarAtivo = await this._modelAtivo.getByAssets(venda.codAtivo);
    const encontrarCliente = await this._modelCliente.getByClienteCod(
      codCliente
    );
    const getCarteiraCliente =
      await this._serviceCarteira.getClienteCarteiraAtivo(codAtivo, codCliente);
    if (!encontrarAtivo) {
      throw new ErroHttp(401, 'Este Ativo não existe.');
    }
    if (!getCarteiraCliente) {
      throw new ErroHttp(401, 'Esse item na carteira não existe.');
    }
    if (getCarteiraCliente.qtdeAtivo < qtdeAtivo) {
      throw new ErroHttp(
        400,
        'Essa quantidade é maior que a quantidade disponível na carteira.'
      );
    }
    const saldoCliente = encontrarCliente?.saldo;
    const valorVenda = Number(encontrarAtivo.valorAtivo) * Number(qtdeAtivo);

    const saldoAtual = Number(saldoCliente) + valorVenda;
    await this._modelCliente.updateSaldo(codCliente, saldoAtual);

    await this._serviceCarteira.handleCarteira(tipoCompra, codAtivo, codCliente, qtdeAtivo);
    const quantidadeAtualAtivo = Number(encontrarAtivo.qtdeAtivo) + qtdeAtivo;
    await this._modelAtivo.updateQuantidadeAtivo(
      codAtivo,
      quantidadeAtualAtivo
    );
    return this._model.create({
      ...venda,
      valor: new Decimal(encontrarAtivo.valorAtivo),
    });
  }
}
