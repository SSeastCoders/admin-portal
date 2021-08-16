import { AccountInterest, AccountType } from "./const";
import { User } from "./user";


export class Account {
    id!: number;
    accountType: AccountType;
    usersIds!:
        Set<number>;
    interestRate!: AccountInterest;
    openDate: string | undefined ;
    balance!: number;
    activeStatus: boolean | undefined ;
    //transactionLimit: number;
}
