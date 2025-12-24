const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const accountController = require('../../../controllers/account');
const accountValidation = require('../../../validation/account');
const validate = require('../../../middlewares/validate');

// Apply a rate limiter to all account routes (e.g., 100 reqs per 15min window)
const accountsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = Router();
router.use(accountsLimiter);
router.get('/', accountController.getAccounts);
router.get('/:id', validate(accountValidation.getAccountById), accountController.getAccountById);
router.post('/', validate(accountValidation.createAccount), accountController.createAccount);
router.put('/:id', validate(accountValidation.updateAccountById), accountController.updateAccountById);
router.delete('/:id', validate(accountValidation.deleteAccountById), accountController.deleteAccountById)
module.exports = router;
