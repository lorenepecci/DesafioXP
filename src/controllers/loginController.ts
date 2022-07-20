import { Request, Response } from 'express';
import { LoginService } from '../services/loginService';

const _service = new LoginService();
export class LoginController {
  async create(req: Request, res: Response) {
    const { email, senha } = req.body;
    const token = await _service.create({ email, senha });
    return res.status(200).json(token); 
  }
}
