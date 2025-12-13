import { string, object } from 'joi';

const objectId = string().regex(/^[0-9a-fA-F]{24}$/);

const getAccountById = {
  params: object().keys({
    id: objectId.required(),
  }),
};

const deleteAccountById = {
  params: object().keys({
    id: objectId.required(),
  }),
};

const createAccount = {
  body: object().keys({
    name: string().required(),
    number: string().required(),
    status: string().valid('new', 'active', 'completed', 'cancelled').optional(),
    type: string().valid('root', 'sub').optional(),
  }),
};

const updateAccountById = {
  params: object().keys({
    id: objectId.required(),
  }),
  body: object().keys({
    name: string().required(),
    number: string().required(),
    status: string().valid('new', 'active', 'completed', 'cancelled').optional(),
    type: string().valid('root', 'sub').optional(),
  }),
};

export default {
  getAccountById,
  createAccount,
  deleteAccountById,
  updateAccountById,
};
