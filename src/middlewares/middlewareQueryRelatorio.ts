import { NextFunction, Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';

const middlewareQueryRelatorio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keyCliente = Object.keys(req.query)[0];
  const keyInicio = Object.keys(req.query)[1];
  const keyFim = Object.keys(req.query)[2];
  const valueCliente = Object.values(req.query)[0] as string;
  const valueInicio = Object.values(req.query)[1] as string;
  const valueFim = Object.values(req.query)[2] as string;
  if (
    keyCliente !== 'codCliente' ||
    keyInicio !== 'inicio' ||
    keyFim !== 'fim'
  ) {
    throw new ErroHttp(
      500,
      'Campos incorretos ou faltantes. Os campos são codCliente, inicio e fim.'
    );
  }
  if (/^[0-9]+$/.test(valueCliente) === false) {
    throw new ErroHttp(500, `Parâmetro deve ser um numero inteiro. `);
  }
  if (
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(valueFim) ===
      false ||
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(valueInicio) ===
      false
  ) {
    throw new ErroHttp(500, `Parâmetro deve ter o formato aaaa-mm-dd `);
  }

  next();
};

export { middlewareQueryRelatorio };
