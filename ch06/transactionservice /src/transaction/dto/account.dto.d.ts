export declare class AccountApiResponse {
    success: boolean;
    account: Account;
    constructor(success: boolean, account: Account);
}
interface Account {
    name: string;
    number: string;
    type: 'root' | 'sub';
    status: 'new' | 'active' | 'inactive' | 'blocked';
    createdAt: Date;
    updatedAt?: Date;
}
declare class Account implements Account {
    name: string;
    number: string;
    type: 'root' | 'sub';
    status: 'new' | 'active' | 'inactive' | 'blocked';
    createdAt: Date;
    updatedAt?: Date;
}
export {};
//# sourceMappingURL=account.dto.d.ts.map