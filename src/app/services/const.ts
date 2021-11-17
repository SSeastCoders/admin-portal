import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit';
import { Account } from '../models/account';
import { User } from '../models/user';
import { Transaction } from '../models/transaction';

export enum ApiMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export enum AuthEndPoints {
  LOGIN = '/login',
  LOGOUT = '/logout',
  REGISTER = '/users',
}

export enum UserEndPoints {
  MAIN = '/users',
}

export enum CardEndPoints {
  CREDIT = '/credit-cards',
}

export class SpecificUser {
  fullUrl: string;
  constructor(private userNumber: string) {
    this.fullUrl = environment.userUrl.concat('/').concat(userNumber);
  }
}

export enum AccountEndPoints {
  MAIN = '/accounts',
}

export enum TransactionEndPoints {
  MAIN = '/transactions'
}

export class SpecificAccount {
  fullUrl: string;
  constructor(private acctNumber: string) {
    this.fullUrl = environment.accountUrl.concat('/').concat(acctNumber);
  }
}

export class SpecificCard {
  fullUrl: string;
  constructor(private cardNum: string) {
    this.fullUrl = environment.cardUrl.concat('/').concat(cardNum);
  }
}

export class PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export class IUserPagination {
  content: User[];

  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
export class IAccountPagination {
  content: Account[];

  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export class ICreditPagination {
  content: Credit[];

  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export enum ConstraintError {
  EMAIL = 'duplicate email',
  USERNAMEANDEMAIL = 'duplicate username and email',
  USERNAME = 'duplicate username',
}
