import { AccountInterest, AccountType } from "./const";
import { User } from "./user";


export class Account {
    id!: number;
    accountType: AccountType;
    users!:
        User[];
    interestRate!: AccountInterest;
    openDate: string;
    balance!: number;
    activeStatus: boolean;
    nickName!: string;
    //transactionLimit: number;
}
