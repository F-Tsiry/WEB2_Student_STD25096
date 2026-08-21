import { type Express, type Request, type Response } from 'express';
import { AuthService } from '../services/AuthService';
import { authenticate, AuthenticatedRequest } from '../Security/AuthMiddleware';

export class AuthController {
  private app: Express;
  private authService: AuthService;

  constructor(app: Express) {
    this.app = app;
    this.authService = new AuthService();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.app.post('/auth/register', async (req: Request, res: Response) => {
      try {
        const result = await this.authService.register(req.body, 'STUDENT');
        res.status(201).json(result);
      } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message });
      }
    });

    this.app.post('/auth/login', async (req: Request, res: Response) => {
      try {
        const result = await this.authService.login(req.body);
        res.status(200).json(result);
      } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message });
      }
    });

    this.app.get('/auth/whoami', authenticate, (req: AuthenticatedRequest, res: Response) => {
      res.status(200).json({ user: req.user });
    });
  }
}