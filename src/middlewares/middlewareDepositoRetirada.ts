import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  codCliente: Joi.number().integer().required(),
  valor: Joi.number().required(),
});

const middlewareDepositoRetirada = (
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
        return res.status( 422 ).json( { message } );
      case 'number.integer':
        return res.status(422).json({ message });
      default:
        return res
          .status(500)
          .json({ message: 'Erro no corpo da requisição.' });
    }
  }
  next();
};

export { middlewareDepositoRetirada };
