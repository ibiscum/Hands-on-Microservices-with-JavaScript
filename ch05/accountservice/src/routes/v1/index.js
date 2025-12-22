import { Router } from 'express';
import accountRouter from './accounts/index.js';

const router = Router();

router.use('/accounts', accountRouter);

export default router;
