import { Router } from 'express';
import { VerifyController } from '../controllers/verify.controller';

const router = Router();
router.get('/verify/:data', VerifyController.handleVerify);
export default router;