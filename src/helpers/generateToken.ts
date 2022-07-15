import 'dotenv/config';
import jsonToken, { Secret, SignOptions } from 'jsonwebtoken';

const TOKEN_SECRET: Secret = 'my-character-ultra-secure-and-ultra-long-secretXP';

const jwsConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (dataUser: string) =>
  jsonToken.sign({ dataUser }, TOKEN_SECRET, jwsConfig);

export default generateToken;
