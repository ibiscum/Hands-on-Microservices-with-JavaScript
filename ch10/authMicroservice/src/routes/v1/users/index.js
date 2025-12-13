const { Router } = require('express');
const userController = require('../../../controllers/user');
const { loginSchema } = require('../../../validation/user');
const validate = require('../../../middlewares/validate');
const rateLimit = require('express-rate-limit');

// Limit: 5 requests per 15 minutes per IP for token generation
const tokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many token requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router.post('/register', validate(loginSchema), userController.createUser);
router.post('/login', validate(loginSchema), userController.loginUser);
router.post('/token', tokenLimiter, validate(loginSchema), userController.getAccessTokenbyRefreshToken);
module.exports = router;