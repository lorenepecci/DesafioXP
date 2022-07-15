import 'dotenv/config';
import jsonToken, { Secret } from 'jsonwebtoken';
import HttpException from './errorClass';

const TOKEN_SECRET: Secret =
  'my-character-ultra-secure-and-ultra-long-secretXP';

const authenticateToken = (token: string) => {
  try {
    const validate = jsonToken.verify(token, TOKEN_SECRET);
    return validate;
  } catch (err) {
    throw new HttpException(500, 'token problem!');
  }
};

export default authenticateToken;