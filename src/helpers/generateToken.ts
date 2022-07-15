import jsonToken, { SignOptions } from 'jsonwebtoken';
const tokenSecret = 'mySecretWebTokenXP';

const jwsConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (dataUser: string) =>
  jsonToken.sign({ dataUser }, tokenSecret, jwsConfig);

export default generateToken;
