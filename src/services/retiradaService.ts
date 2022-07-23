import { ErroHttp } from '../helpers/erroHttp';
import { IDepositoRetirada } from '../interfaces/depositoRetirada';
import { ClientesModel } from '../models/clientesModel';
import { DepositoRetiradaModel } from '../models/depositoRetiradaModel';

export class RetiradaService {
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
    retirada: IDepositoRetirada
  ): Promise<IDepositoRetirada | ErroHttp> {
    const { codCliente, valor } = retirada;
    const saldoCliente = await this._modelCliente
      .getByClienteCod(codCliente)
      .then((cliente) => cliente?.saldo);

    if (Number(valor) > Number(saldoCliente)) {
      throw new ErroHttp(
        400,
        `Você não tem saldo disponível. Seu saldo é de ${saldoCliente}`
      );
    }
    const saldoNovoCliente = Number(saldoCliente) - Number(valor);

    await this._modelCliente.updateSaldo(codCliente, saldoNovoCliente);

    const depositoRetiradaCriar = {
      codCliente,
      tipoDeposito: false,
      valor,
    };

    return this._model.create(depositoRetiradaCriar);
  }
}
