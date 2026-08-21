import express, { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { authenticate, AuthenticatedRequest } from '../Security/AuthMiddleware';

export class AuthController {
  public router = express.Router();
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post('/register', async (req: Request, res: Response) => {
      try {
        const result = await this.authService.register(req.body, 'STUDENT');
        res.status(201).json(result);
      } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message });
      }
    });

    this.router.post('/login', async (req: Request, res: Response) => {
      try {
        const result = await this.authService.login(req.body);
        res.status(200).json(result);
      } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message });
      }
    });

    this.router.get('/whoami', authenticate, (req: AuthenticatedRequest, res: Response) => {
      res.status(200).json({ user: req.user });
    });
  }
}

export default new AuthController().router;