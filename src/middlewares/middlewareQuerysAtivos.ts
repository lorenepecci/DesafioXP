import { NextFunction, Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';

const middlewareQuerysAtivos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = Object.keys(req.query)[0];
  const value = Object.values(req.query)[0] as string;
  if (key !== 'codCliente' && key !== 'codAtivo') {
    throw new ErroHttp(500, 'Não existe esta query para esta requisição.');
  }
  if (!value || /^[0-9]+$/.test(value) === false) {
    throw new ErroHttp(500, 'Parâmetro deve ser um numero inteiro.');
  }

  next();
};

export { middlewareQuerysAtivos };
