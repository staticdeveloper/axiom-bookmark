import { Router } from 'express';
import 'metaplex';
import seedRoutes from './seed.route';
import verifyRoutes from './verify.route';

const router = Router();
router.use('/', seedRoutes);
router.use('/', verifyRoutes);
export default router;
