const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const accountController = require('../../../controllers/account');
const accountValidation = require('../../../validation/account');
const validate = require('../../../middlewares/validate');

// Set up rate limiter: max 100 requests per 15 minutes per IP
const accountsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
 max: 100, // limit each IP to 100 requests per windowMs
 standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
 legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = Router();
// Apply rate limiter to all account routes
router.use(accountsLimiter);

// Apply rate limiter to all account routes (moved above)
router.get('/', accountController.getAccounts);
router.get('/:id', validate(accountValidation.getAccountById), accountController.getAccountById);
router.post('/', validate(accountValidation.createAccount), accountController.createAccount);
router.put('/:id', validate(accountValidation.updateAccountById), accountController.updateAccountById);
router.delete('/:id', validate(accountValidation.deleteAccountById), accountController.deleteAccountById)
module.exports = router;