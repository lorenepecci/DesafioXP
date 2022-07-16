import HttpException from '../helpers/erroClasse';
import { IDepositoRetirada } from '../interfaces/depositoRetirada';
import { ClientesModel } from '../models/clientesModel';
import { DepositoRetiradaModel } from '../models/depositoRetiradaModel';

export class DepositoRetiradaService {
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
    depositoRetirada: IDepositoRetirada
  ): Promise<IDepositoRetirada | HttpException> {
    const { codCliente, valor, deposito } = depositoRetirada;
    const saldoCliente = await this._modelCliente
      .getByClienteCod(codCliente)
      .then((cliente) => cliente?.saldo);

    if (saldoCliente) {
      let saldoNovo;
      if (deposito === false) {
        if (Number(valor) > Number(saldoCliente)) {
          throw new HttpException(
            400,
            `Você não tem saldo disponível. Seu saldo é de ${saldoCliente}`
          );
        }
        saldoNovo = Number(saldoCliente) - Number(valor);
        await this._modelCliente.updateSaldo(codCliente, saldoNovo);
      } else if (deposito === true) {
        saldoNovo = Number(saldoCliente) + Number(valor);
        await this._modelCliente.updateSaldo(codCliente, saldoNovo);
      }
    }
    return this._model.create(depositoRetirada);
  }
}
