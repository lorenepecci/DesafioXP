import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  codAtivo: Joi.string().required(),
  qtdeAtivo: Joi.number().integer().min(1).required(),
});

const validarCompraVenda = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];
    switch (type) {
      case 'any.required':
        return res.status(400).json({ message });
      case 'number.base':
        return res.status(422).json({ message });
      case 'number.integer':
        return res.status(422).json({ message });
      case 'number.min':
        return res.status(422).json({ message });
      case 'string.base':
        return res.status(422).json({ message });
      default:
        break;
    }
  }
  next();
};

export { validarCompraVenda };
