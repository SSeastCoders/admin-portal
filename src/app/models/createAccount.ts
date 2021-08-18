import { AccountType } from "./const";
import { User } from "./user";

export class CreateAccount {
    //id: number;
    accountType: AccountType;
    usersIds: number[];
    interestRate!: number;
    openDate: number | undefined ;
    balance!: number;
    activeStatus: boolean | undefined ;
    nickName?: string;
    //transactionLimit: number;
}
