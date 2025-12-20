export class AccountApiResponse {
    success;
    account;
    constructor(success, account) {
        this.success = success;
        this.account = account;
    }
}
class Account {
    name;
    number;
    type;
    status;
    createdAt;
    updatedAt;
}
//# sourceMappingURL=account.dto.js.map