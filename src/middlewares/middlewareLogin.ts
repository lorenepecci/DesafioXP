import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  senha: Joi.string().min(6).required(),
});

const middlewareLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];
    switch (type) {
      case 'any.required':
        return res.status(400).json({ message });
      case 'string.base':
        return res.status(422).json({ message });
      case 'string.email':
        return res.status(422).json({ message });
      case 'string.min':
        return res.status(422).json({ message });
      default:
        return res
          .status(500)
          .json({ message: 'Erro no corpo da requisição.' });
    }
  }
  next();
};

export { middlewareLogin };
