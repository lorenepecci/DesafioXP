import { NextFunction, Response } from 'express';
import HttpException from '../helpers/erroClasse';
const Joi = require('joi');

const Cliente = Joi.object({
  codCliente: Joi.string().required(),
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(6).required(),
});

const validarCliente = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Cliente.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];
    switch (type) {
      case 'any.required':
        return res.status(400).json({ message });

      case 'string.base':
        return res.status(422).json({ message });

      default:
        throw new HttpException(500, 'Erro no corpo da requisição.');
    }
  }
  next();
};

export { validarCliente };
