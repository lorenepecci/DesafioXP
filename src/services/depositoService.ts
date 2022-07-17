import { Decimal } from '@prisma/client/runtime';
import { ErroHttp } from '../helpers/erroHttp';
import { IDepositoRetirada } from '../interfaces/depositoRetirada';
import { ClientesModel } from '../models/clientesModel';
import { DepositoRetiradaModel } from '../models/depositoRetiradaModel';

export class DepositoService {
  private _model: DepositoRetiradaModel;
  private _modelCliente: ClientesModel;
  constructor(
    model = new DepositoRetiradaModel(),
    cliente = new ClientesModel()
  ) {
    this._model = model;
    this._modelCliente = cliente;
  }
  async create(
    codClienteLogado: number,
    deposito: IDepositoRetirada
  ): Promise<IDepositoRetirada | ErroHttp> {
    const { codCliente, valor } = deposito;
    const saldoClienteLogado = await this._modelCliente
      .getByClienteCod(codClienteLogado)
      .then((cliente) => cliente?.saldo);
    const saldoCliente = await this._modelCliente
      .getByClienteCod(codCliente)
      .then((cliente) => cliente?.saldo);

    if (codClienteLogado !== codCliente) {
      if (Number(valor) > Number(saldoClienteLogado)) {
        throw new ErroHttp(
          400,
          `Você não tem saldo disponível. Seu saldo é de ${saldoClienteLogado}`
        );
      }
      if (!saldoCliente) {
        throw new ErroHttp(400, 'Esse cliente não existe.');
      }
      const saldoNovoClienteLogado = Number(saldoClienteLogado) - Number(valor);
      const saldoNovoCliente = Number(saldoCliente) + Number(valor);
      await this._modelCliente.updateSaldo(
        codClienteLogado,
        saldoNovoClienteLogado
      );
      await this._modelCliente.updateSaldo(codCliente, saldoNovoCliente);
    } else {
      const saldoNovoCliente = Number(saldoCliente) + Number(valor);
      await this._modelCliente.updateSaldo(codCliente, saldoNovoCliente);
    }
    const depositoRetiradaCriar = {
      codCliente: codClienteLogado,
      tipoDeposito: true,
      valor: new Decimal(valor),
    };

    return this._model.create(depositoRetiradaCriar);
  }
}
