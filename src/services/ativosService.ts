import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { IAtivo } from '../interfaces/ativos';
import { AtivosModel } from '../models/ativosModel';
import { CarteirasModel } from '../models/carteirasModel';

export class AtivosService {
  private _model: AtivosModel;
  private _modelCarteira: CarteirasModel;
  constructor(model = new AtivosModel(), carteira = new CarteirasModel()) {
    this._model = model;
    this._modelCarteira = carteira;
  }
  async create(ativo: IAtivo) {
    const ativoCriado = await this._model.create(ativo);
    return {
      codAtivo: ativoCriado.codAtivo,
      qtdeAtivo: ativoCriado.qtdeAtivo,
      valor: Number(ativoCriado.valorAtivo),
    };
  }

  async getByAssets(codAtivo: number) {
    if (codAtivo === 0) {
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
    const getAtivo = await this._model.getByAssets(codAtivo);
    if (!getAtivo) throw new ErroHttp(400, 'Esse ativo não existe. ');
    const { qtdeAtivo, valorAtivo } = getAtivo;
    return { codAtivo, qtdeAtivo, valor: Number(valorAtivo) };
  }
}
