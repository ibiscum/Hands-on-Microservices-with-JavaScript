
import Joi from 'joi';

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const getAccountById = {
  params: Joi.object().keys({
    id: objectId.required(),
  }),
};

export const deleteAccountById = {
  params: Joi.object().keys({
    id: objectId.required(),
  }),
};

export const createAccount = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    number: Joi.string().required(),
    status: Joi.string().valid('new', 'active', 'completed', 'cancelled').optional(),
    type: Joi.string().valid('root', 'sub').optional(),
  }),
};

export const updateAccountById = {
  params: Joi.object().keys({
    id: objectId.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    number: Joi.string().required(),
    status: Joi.string().valid('new', 'active', 'completed', 'cancelled').optional(),
    type: Joi.string().valid('root', 'sub').optional(),
  }),
};
