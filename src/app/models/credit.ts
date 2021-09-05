import { CardType } from "./const";
import { User } from "./user";

export class Credit {
  id!: number;
  users: User[];
  cvv!: number;
  cardType!: CardType;
  openDate!: string;
  expDate!: string;
  nickName!: string;
  activeStatus: boolean;
  interestRate: number;
  creditLimit: number;
  availableCredit: number;
  balance: number;
  dueDate: string;
  minDue: number;
}

