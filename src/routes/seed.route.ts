import { Router } from 'express';
import { SeedController } from '../controllers/seed.controller';

const router = Router();
router.post('/v1/seed', SeedController.handleSeed);
export default router;