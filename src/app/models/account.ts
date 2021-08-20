import { AccountInterest, AccountType } from "./const";
import { User } from "./user";


export class Account {
    id!: number;
    accountType: AccountType;
    users!:
        User[];
    interestRate!: AccountInterest;
    openDate: string | undefined ;
    balance!: number;
    activeStatus: boolean | undefined ;
    nickName!: string;
    //transactionLimit: number;
}
