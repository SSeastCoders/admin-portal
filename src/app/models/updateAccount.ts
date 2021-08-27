import { AccountType } from "./const";

export class UpdateAccount {
    id: number;
    accountType: AccountType;
    usersIds: number[];
    nickName: string;
}
