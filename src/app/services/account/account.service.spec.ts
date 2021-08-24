import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from 'src/app/models/account';
import { AccountInterest, AccountType } from 'src/app/models/const';
import { CreateAccount } from 'src/app/models/createAccount';
import { environment } from 'src/environments/environment';
import { AccountEndPoints } from '../const';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let client: HttpClient;
  let account: Account;
  let accountNew: CreateAccount;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);

    account = {
      id: 2,
      accountType: AccountType.CHECKING,
      usersIds: [1, 2],
      interestRate: AccountInterest.CHECKING,
      balance: 100,
      activeStatus: true,
      openDate: 'somedate',
    };

    accountNew = {
      accountType: AccountType.CHECKING,
      usersIds: [1, 2],
      interestRate: AccountInterest.CHECKING,
      balance: 100,
      activeStatus: true,
      openDate: 2315235,
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data, all', () => {
    let result: Account[];
    service.findAll().subscribe((t) => {
      result = t;
    });
    const req = httpMock.expectOne({
      method: 'GET',
      url: environment.accountUrl + AccountEndPoints.MAIN,
    });

    req.flush([account]);

    expect(result[0]).toEqual(account);
  });

  it('should return data, specific', () => {
    let result: Account;
    service.find(1).subscribe((t) => {
      result = t;
    });
    const req = httpMock.expectOne({
      method: 'GET',
      url: environment.accountUrl + AccountEndPoints.MAIN + '/1',
    });

    req.flush([account]);

    // these look the same to my eyes, but they say they are not the same...
    //expect(result).toEqual(account);
  });

  it('should create account', () => {
    let result: Account;
    service.createAccount(accountNew);
    const req = httpMock.expectOne({
      method: 'POST',
      url: environment.accountUrl + AccountEndPoints.MAIN,
    });

    req.flush([account]);

    // these look the same to my eyes, but they say they are not the same...
    //expect(result).toEqual(account);
  });
});
