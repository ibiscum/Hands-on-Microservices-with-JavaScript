const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const accountController = require('../../../controllers/account');
const accountValidation = require('../../../validation/account');
const validate = require('../../../middlewares/validate');

// Create a rate limiter for the GET / route
const getAccountsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

const router = Router();
router.get('/', getAccountsLimiter, accountController.getAccounts);
router.get('/:id', validate(accountValidation.getAccountById), accountController.getAccountById);
router.post('/', validate(accountValidation.createAccount), accountController.createAccount);
router.put('/:id', validate(accountValidation.updateAccountById), accountController.updateAccountById);
router.delete('/:id', validate(accountValidation.deleteAccountById), accountController.deleteAccountById)
module.exports = router;