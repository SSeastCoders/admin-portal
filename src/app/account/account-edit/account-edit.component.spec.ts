import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  ParamMap,
  Params,
  Route,
  UrlSegment,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Address } from 'src/app/models/address';
import { AccountType, AccountInterest } from 'src/app/models/const';
import { Role } from 'src/app/models/role';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpService } from 'src/app/services/http/http.service';

import { AccountEditComponent } from './account-edit.component';

export class MockActivatedRoute implements ActivatedRoute {
  get paramMap(): Observable<ParamMap> {
    throw new Error('Method not implemented.');
  }
  get queryParamMap(): Observable<ParamMap> {
    throw new Error('Method not implemented.');
  }
  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data>;
  outlet: string;
  component: any | string;
  routeConfig: Route;
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[];
  pathFromRoot: ActivatedRoute[];
  toString(): string {
    return '';
  }
}

describe('AccountEditComponent', () => {
  let component: AccountEditComponent;
  let fixture: ComponentFixture<AccountEditComponent>;
  let fb: FormBuilder;
  let service: AccountService;
  let route: MockActivatedRoute;
  let account: Account;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormBuilder,
        HttpService,
        AccountService,
        { provide: HttpClient, userClass: HttpClientTestingModule },
        { provide: HttpHandler, userClass: HttpClientTestingModule },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
          },
          //{
          //provide: ActivatedRoute, useValue: {
          // params: of({ id: 1 })
          //snapshot: {params: {id: '24'}}
          //}
        },
      ],
    }).compileComponents();

    service = TestBed.get(AccountService);
  });

  beforeEach(() => {
    route = new MockActivatedRoute();
    route.parent = new MockActivatedRoute();
    route.parent.params = of({ id: 'test' });

    fixture = TestBed.createComponent(AccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fb = new FormBuilder();
    component.accountForm = fb.group({
      accountType: ['', []],
      users: fb.array([]),
      nickName: ['', []],
    });
    component.accountForm.patchValue({
      accountType: 'SAVING',
      nickName: 'NICKNAME',
    });
    for (let i = 0; i < 4; i++) {
      component.users().push(component.newUserWithValue(i));
    }

    component.account = {
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form', () => {
    component.buildForm(component.account);

    expect(component.hasBeenTouched).toBeFalse();
    expect(component.accountForm.get('accountType').value).toEqual(
      component.account.accountType
    );
    expect(component.accountForm.get('nickName').value).toEqual(
      component.account.nickName
    );
    expect(component.accountForm.get('users').value.length).toEqual(
      component.account.users.length
    );
  });

  it('should add users', () => {
    component.addUser();
    expect(component.accountForm.get('users').value.length).toEqual(5);
  });

  it('should remove users', () => {
    component.removeUser(1);
    expect(component.accountForm.get('users').value.length).toEqual(3);
  });

  it('should remove duplicates', () => {
    expect(component.removeDuplicate([1, 1, 2, 3, 4, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should get properties', () => {
    expect(component.accountType).toEqual(
      component.accountForm.get('accountType')
    );
    expect(component.nickName).toEqual(component.accountForm.get('nickName'));
  });

  it('should generate an account', () => {
    component.generateAccount();

    expect(component.updateAccount.nickName).toEqual('NICKNAME');
    expect(component.updateAccount.id).toEqual(component.account.id);
  });

  // commented out for dev ops sprint
  // it('should cancel', () => {
  //   event = new Event("click");
  //   component.cancel(event);
  // })

  it('control deactivation', () => {
    component.accountForm.markAsDirty();
    expect(component.canDeactivate()).toBeFalse();
    component.accountForm.markAsPristine();
    expect(component.canDeactivate()).toBeTrue();
  });
});
