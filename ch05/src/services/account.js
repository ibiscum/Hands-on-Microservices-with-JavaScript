import account from '../models/account.js';

//get account info by id
export function getAccountById(id) {
  return account.findById(id);
}

//get all account information
export function getAllAccounts() {
  return account.find({});
}

//create account based on name,number,type and status
export function createAccount(name, number, type, status) {
  return account.create({ number, name, type, status });
}

//delete account by account id
export async function deleteAccountById(id) {
    const deletedAccount = await account.findByIdAndDelete(id);
    if(deletedAccount)
     return true;
     else
     return false;
 }

//'new', 'active', 'inactive', 'blocked'
const availableAccountStatusesForUpdate = {
    new: ['active', 'blocked'],
    active: ['inactive', 'blocked'],
    inactive: ['active'],
    blocked: ['active'],
};

//'root', 'sub'
const availableAccountTypesForUpdate = {
    root: ['sub'],
    sub: ['root'],
};

export const NO_VALID_DATA_TO_UPDATE = 0;
export const INVALID_STATUS_CODE = 1;
export const INVALID_TYPE_CODE = 2;
export const INVALID_ACCOUNT = 3;
export const INVALID_STATE_TRANSITION = 4;
export const INVALID_TYPE_TRANSITION = 5;

export async function updateAccountById(id, { name, number, type, status }) {
    if (!name && !number && !type && !status) {
        return { error: 'provide at least one valid data to be updated', code: NO_VALID_DATA_TO_UPDATE };
    }

    if (status && !(status in availableAccountStatusesForUpdate)) {
        return { error: 'invalid status for account', code: INVALID_STATUS_CODE };
    }

    if (type && !(type in availableAccountTypesForUpdate)) {
        return { error: 'invalid type for account', code: INVALID_TYPE_CODE };
    }

    const account = await account.findById(id);
    if (!account) {
        return { error: 'account not found', code: INVALID_ACCOUNT };
    }

    //check for available status and transition
    if (status) {
        const allowedStatuses = availableAccountStatusesForUpdate[account.status];
        if (!allowedStatuses.includes(status)) {
            return {
                error: `cannot update status from '${account.status}' to '${status}'`,
                code: INVALID_STATE_TRANSITION,
            };
        }
    }

    //check for available type and transition
    if (type) {
        const allowedTypes = availableAccountTypesForUpdate[account.type];
        if (!allowedTypes.includes(type)) {
            return {
                error: `cannot update type from '${account.type}' to '${type}'`,
                code: INVALID_TYPE_TRANSITION,
            };
        }
    }

    account.status = status ?? account.status;
    account.type = type ?? account.type;
    account.name = name ?? account.name;
    account.number = number ?? account.number;
    account.updatedAt = Date.now();

    await account.save();

    return account;
}

export const errorCodes = {
        NO_VALID_DATA_TO_UPDATE,
        INVALID_STATUS_CODE,
        INVALID_TYPE_CODE,
        INVALID_ACCOUNT,
        INVALID_STATE_TRANSITION,
        INVALID_TYPE_TRANSITION,
    };
