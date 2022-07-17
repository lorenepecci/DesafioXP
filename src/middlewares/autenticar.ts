import { NextFunction, Request, Response } from 'express';
import {autenticarToken } from '../helpers/autenticarToken';

const autenticarMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = { status: 401, message: 'Token não encontrado.' };
    return res.status(err.status).json({ message: err.message });
  }
  try {
    const payload = autenticarToken(token);
    res.locals.payload = payload;
  } catch {
    return res.status(401).json({ message: 'Token inválido.' });
  }

  next();
};

export { autenticarMiddleware };

