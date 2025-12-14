import {
  getAccountById as _getAccountById,
  getAllAccounts,
  createAccount as _createAccount,
  deleteAccountById as _deleteAccountById,
  updateAccountById as _updateAccountById,
  errorCodes
} from '../services/account.js';

export const getAccountById = async (req, res) => {
    const result = await _getAccountById(req.params.id);

    if (result) {
        res.status(200).json({ success: true, account: mapToResponse(result) });
    } else {
        res.status(404).json({ success: false, message: 'Account not found' });
    }
};

export const getAccounts = async (req, res) => {
    const result = await getAllAccounts();
    res.status(200).json({ success: true, account: result.map(x => mapToResponse(x)) });
};

export const createAccount = async (req, res) => {
    const { name, number, type, status } = req.body;
    const result = await _createAccount(name, number, type, status);

    res.status(201).json({
        success: true,
        Account: mapToResponse(result),
    });
};

export const deleteAccountById = async (req, res) => {
    const isDeleted = await _deleteAccountById(req.params.id);

    if(isDeleted)
     res.status(204).json({
         success: true
     });
     else
     res.status(400).json({ success: false, message: 'No valid data to delete' });
 };

export const updateAccountById = async (req, res) => {
    const result = await _updateAccountById(req.params.id, req.body);
    if (result.error) {
        switch (result.code) {
            case errorCodes.NO_VALID_DATA_TO_UPDATE:
                res.status(400).json({ success: false, message: result.error });
                return;
            case errorCodes.INVALID_STATUS_CODE:
                res.status(400).json({ success: false, message: 'invalid status' });
                return;
            case errorCodes.INVALID_TYPE_CODE:
                res.status(400).json({ success: false, message: 'invalid type' });
                return;
            case errorCodes.INVALID_ACCOUNT:
                res.status(404).json({ success: false, message: 'Account not found' });
                return;
            case errorCodes.INVALID_STATE_TRANSITION:
                res.status(400).json({ success: false, message: result.error });
                return;
            case errorCodes.INVALID_TYPE_TRANSITION:
                res.status(400).json({ success: false, message: result.error });
                return;
            default:
                res.status(500).json({ success: false, message: 'internal server error' });
                return;
        }
    }

    res.status(200).json({
        success: true,
        Account: mapToResponse(result),
    });
};

//helper function to return required account fields to user
function mapToResponse(account) {
    const {
        id, name, number, type, status,
    } = account;

    return {
        id,
        name,
        number,
        type,
        status
    };
}
