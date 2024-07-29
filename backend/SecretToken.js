import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export const createSecretToken = (id) => {
  return JWT.sign({ id }, JWT_SECRET_KEY, {
    expiresIn: 10 * 24 * 60 * 60,
  });
};