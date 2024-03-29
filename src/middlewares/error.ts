import { NextFunction, Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';

const middlewareErro = (
  erro: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = erro as ErroHttp;
  res.status(status || 500).json({ message });
  next();
};

export { middlewareErro };
