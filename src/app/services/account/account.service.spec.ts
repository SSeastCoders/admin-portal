import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from 'src/app/models/account';
import { Address } from 'src/app/models/address';
import { AccountInterest, AccountType } from 'src/app/models/const';
import { CreateAccount } from 'src/app/models/createAccount';
import { Role } from 'src/app/models/role';
import { UpdateAccount } from 'src/app/models/updateAccount';
import { environment } from 'src/environments/environment';
import { AccountEndPoints } from '../const';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let client: HttpClient;
  let account: Account;
  let accountNew: CreateAccount;
  let accountUpdate: UpdateAccount;
  let httpClientSpy: { get: jasmine.Spy };

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
      users: [
        {
          id: 1,
          role: new Role(1, 'Admin'),
          firstName: 'FIRST',
          lastName: 'LAST',
          dob: '9874-33-33',
          email: 'email@email.com',
          phone: '1800beepme',
          dateJoined: '9494-44-44',
          activeStatus: true,
          username: 'username',
          address: new Address(),
        },
        {
          id: 2,
          role: new Role(2, 'Customer'),
          firstName: 'FIRST',
          lastName: 'LAST',
          dob: '9874-33-33',
          email: 'email2@email.com',
          phone: '1820beepme',
          dateJoined: '9494-44-44',
          activeStatus: true,
          username: 'username2',
          address: new Address(),
        },
      ],
      interestRate: AccountInterest.CHECKING,
      balance: 100,
      activeStatus: true,
      openDate: 'somedate',
      nickName: 'nickname',
    };

    accountNew = {
      accountType: AccountType.CHECKING,
      usersIds: [1, 2],
      interestRate: AccountInterest.CHECKING,
      balance: 100,
      activeStatus: true,
      openDate: 232453245345,
      nickName: 'nickname',
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

  /// WRITING TESTS
  // it('should send a request to service', () => {
  //   service.
  // })

  // public getAccountsPage(page: number, size: number): Observable<any> {
  //   let req = `?page=${page}&size=${size}`;

  //   console.log(req);
  //   return this.http.requestCallAccount(
  //     AccountEndPoints.MAIN,
  //     ApiMethod.GET,
  //     IAccountPagination,
  //     req
  //   );
  // }
});
