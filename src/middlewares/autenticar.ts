import { NextFunction, Request, Response } from 'express';
import authenticateToken from '../helpers/autenticarToken';

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = { status: 401, message: 'Token not found' };
    return res.status(err.status).json({ message: err.message });
  }
  try {
    const payload = await authenticateToken(token);
    res.locals.payload = payload;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

export { authenticationMiddleware };

