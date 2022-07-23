import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { IAtivo, IAtivoRetorno } from '../interfaces/ativos';
import { AtivosModel } from '../models/ativosModel';
import { CarteirasModel } from '../models/carteirasModel';

export class AtivosService {
  private _modelCarteira: CarteirasModel;
  private _model: AtivosModel;
  constructor(model = new AtivosModel(), carteira = new CarteirasModel()) {
    this._modelCarteira = carteira;
    this._model = model;
  }
  async create(ativo: IAtivo): Promise<IAtivoRetorno> {
    const ativoCriado = await this._model.create(ativo);
    return {
      codAtivo: ativoCriado.codAtivo,
      qtdeAtivo: ativoCriado.qtdeAtivo,
      valor: Number(ativoCriado.valorAtivo),
    };
  }

  async getByAssets(codAtivo: number) {
    const getAtivo = await this._model.getByAssets(codAtivo);
    if (!getAtivo) throw new ErroHttp(400, 'Esse ativo não existe. ');
    const { qtdeAtivo, valorAtivo } = getAtivo;
    return { codAtivo, qtdeAtivo, valor: Number(valorAtivo) };
  }

  async getAtivosCorretora(): Promise<IAtivo[]> {
    const listaAtivos = await this._model.getAtivosCorretora();
    const ativosComprados = listaAtivos.map(async (ativo) => {
      const ativoComprasLista = await this._modelCarteira.getCarteirasAtivo(
        ativo.codAtivo
      );
      const reduceValorCompras = ativoComprasLista.reduce(
        (ac, a) => ac + a.qtdeAtivo,
        0
      );
      return { ...ativo, qtdeComprada: reduceValorCompras };
    });
    const listaResposta = await Promise.all(ativosComprados);
    return listaResposta;
  }
}
