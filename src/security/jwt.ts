import jwt, { SignOptions } from 'jsonwebtoken';
import { AuthenticatedUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-default';
const JWT_EXPIRES_IN: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '1h';

export const signAccessToken = (user: AuthenticatedUser): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string): AuthenticatedUser => {
  return jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
};