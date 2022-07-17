import 'dotenv/config';
import jsonToken, { Secret } from 'jsonwebtoken';

const TOKEN_SECRET: Secret =
  'my-character-ultra-secure-and-ultra-long-secretXP';

const autenticarToken = (token: string) => {
  const validate = jsonToken.verify(token, TOKEN_SECRET);
  return validate;
};

export { autenticarToken };
