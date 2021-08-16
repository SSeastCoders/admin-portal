import { AccountType } from "./const";
import { User } from "./user";

export class CreateAccount {
    //id: number;
    accountType: AccountType;
    usersIds: Set<number>;
    interestRate!: number;
    openDate: number | undefined ;
    balance!: number;
    activeStatus: boolean | undefined ;
    //transactionLimit: number;
}
