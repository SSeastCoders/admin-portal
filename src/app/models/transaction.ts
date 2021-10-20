
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
  type: TransactionType;
  date: string;
  succeeded: boolean;
  pending: boolean;

  public nameType(): string {
    switch (this.type) {
      case TransactionType.TRANSACTION_DEPOSIT:
        return "deposit";
      case TransactionType.TRANSACTION_WITHDRAW:
        return "withdraw";
      case TransactionType.TRANSACTION_TRANSFER:
        return "transfer";
      case TransactionType.TRANSACTION_PAYMENT:
        return "payment";
      case TransactionType.TRANSACTION_CHECK:
        return "check";
      case TransactionType.TRANSACTION_CHARGE:
        return "charge";
      case TransactionType.TRANSACTION_ATM:
        return "atm";
      default:
        return "";
    }
  }
}
