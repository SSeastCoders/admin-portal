
export enum TransactionType {
  TRANSACTION_DEPOSIT,
  TRANSACTION_WITHDRAW,
  TRANSACTION_TRANSFER,
  TRANSACTION_PAYMENT,
  TRANSACTION_CHECK,
  TRANSACTION_CHARGE,
  TRANSACTION_ATM,
}

export class Transaction {
  id: number;
  amount: number;
  description: string;
  type: String;
  date: string;
  succeeded: boolean;
  pending: boolean;

  public nameType(): string {
    const nameType = this.type;
    switch (nameType) {
      case "TRANSACTION_DEPOSIT":
        return "deposit";
      case "TRANSACTION_WITHDRAW":
        return "withdraw";
      case "TRANSACTION_TRANSFER":
        return "transfer";
      case "TRANSACTION_PAYMENT":
        return "payment";
      case "TRANSACTION_CHECK":
        return "check";
      case "TRANSACTION_CHARGE":
        return "charge";
      case "TRANSACTION_ATM":
        return "atm";
      default:
        return "";
    }
  }
}
