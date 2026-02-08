import { Router } from 'express';
import { createUser, loginUser, getAccessTokenbyRefreshToken } from '../../../controllers/user';
import { loginSchema } from '../../../validation/user';
import validate from '../../../middlewares/validate';
import rateLimit from 'express-rate-limit';

// Rate limiter middleware for /token endpoint
const tokenRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // start blocking after 5 requests
  message: "Too many token requests from this IP, please try again after a minute."
});

const router = Router();

router.post('/register', validate(loginSchema), createUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/token', tokenRateLimiter, validate(loginSchema), getAccessTokenbyRefreshToken);
export default router;