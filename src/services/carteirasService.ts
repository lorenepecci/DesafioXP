import 'express-async-errors';
import { ICarteiras } from '../interfaces/carteiras';
import { CarteirasModel } from './../models/carteirasModel';

export class CarteirasService {
  private _model: CarteirasModel;
  constructor(model = new CarteirasModel()) {
    this._model = model;
  }
  async create() {
    //throw error codAtivo nao existe.
  }
  async handleCarteira(carteira: ICarteiras) {
    const { codCliente, codAtivo, qtdeAtivo, valor, compra } = carteira;
    const findOne = await this._model.getOne( codAtivo, codCliente );
    if ( findOne ) {
      if ( qtdeAtivo > findOne.qtdeAtivo ) {
        if ( compra === false ) return "erro vc n tem quantidade suficiente desse ativo"
        // if compra===true e valor*qtde > saldo vc nao tem dn o suficiente
        // sucesso - diminua do saldo da conta e faça um update da quantidade de ativo e valor
      } else if ( qtdeAtivo < findOne.qtdeAtivo ) {
        if ( compra === true ) { 
          //veja se tem saldo suficiente valor*qtde > saldo "erro vc nao tem", "sucesso e diminua.."
          //if compra===false sucesso aumente valor*qntd no seu saldo e retire a quantidade do ativo
        }
      } else if ( qtdeAtivo === findOne.qtdeAtivo ) {
        // vc tem q comparar por valor*quant .. nao adianta só o tanto 
      }
    }
    
  }
}
