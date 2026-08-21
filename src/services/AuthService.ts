import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { Credentials, AuthenticatedUser, Role } from '../models/User';
import { signAccessToken } from '../security/jwt';
import { HttpError } from '../security/HttpError';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(credentials: Credentials, role: Role = 'STUDENT') {
    if (!credentials.password || credentials.password.length < 8) {
      throw new HttpError(400, 'Password must be at least 8 characters long');
    }

    const existingUser = await this.userRepository.findByEmail(credentials.email);
    if (existingUser) {
      throw new HttpError(400, 'Email already in use');
    }

    const passwordHash = await bcrypt.hash(credentials.password, 10);
    const newUser = await this.userRepository.create(credentials.email, passwordHash, role);

    const userWithoutPassword: AuthenticatedUser = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      accessToken: signAccessToken(userWithoutPassword),
      user: userWithoutPassword,
    };
  }

  public async login(credentials: Credentials) {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) throw new HttpError(401, 'Invalid credentials');

    const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
    if (!isPasswordValid) throw new HttpError(401, 'Invalid credentials');

    const userWithoutPassword: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: signAccessToken(userWithoutPassword),
      user: userWithoutPassword,
    };
  }
}