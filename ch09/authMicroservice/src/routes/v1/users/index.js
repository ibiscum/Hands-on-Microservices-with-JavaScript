const { Router } = require('express');
const userController = require('../../../controllers/user');
const { loginSchema } = require('../../../validation/user');
const validate = require('../../../middlewares/validate');
const rateLimit = require('express-rate-limit');

// Rate limiter middleware for /token endpoint
const tokenRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // start blocking after 5 requests
  message: "Too many token requests from this IP, please try again after a minute."
});

const router = Router();

router.post('/register', validate(loginSchema), userController.createUser);
router.post('/login', validate(loginSchema), userController.loginUser);
router.post('/token', tokenRateLimiter, validate(loginSchema), userController.getAccessTokenbyRefreshToken);
module.exports = router;