import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { getAccounts, getAccountById, createAccount, updateAccountById, deleteAccountById } from '../../../controllers/account.js';
import { getAccountById as _getAccountById, createAccount as _createAccount, updateAccountById as _updateAccountById, deleteAccountById as _deleteAccountById } from '../../../validation/account.js';
import validate from '../../../middlewares/validate.js';

// Create a rate limiter for the GET / route
const getAccountsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

const router = Router();
router.get('/', getAccountsLimiter, getAccounts);
router.get('/:id', getAccountsLimiter, validate(_getAccountById), getAccountById);
router.post('/', validate(_createAccount), createAccount);
router.put('/:id', validate(_updateAccountById), updateAccountById);
router.delete('/:id', validate(_deleteAccountById), deleteAccountById)
export default router;
