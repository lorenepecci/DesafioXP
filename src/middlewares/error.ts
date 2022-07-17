import { NextFunction, Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';

const erroHttp = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = err as ErroHttp;
  res.status(status || 500).json({ message });
  next();
};

export default erroHttp;
