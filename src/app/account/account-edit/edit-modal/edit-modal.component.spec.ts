import { HttpClientTestingModule } from '@angular/common/http/testing';
import { compileComponentFromMetadata } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/app/models/account';
import { AccountType } from 'src/app/models/const';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpService } from 'src/app/services/http/http.service';
import { UserService } from 'src/app/services/user/user.service';
import { AccountEditComponent } from '../account-edit.component';

import { EditModalComponent } from './edit-modal.component';

describe('EditModalComponent', () => {
  let userService: UserService;
  let accountService: AccountService;
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  let hostComponent: AccountEditComponent;
  let hostFixture: ComponentFixture<AccountEditComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalComponent, AccountEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpService, NgbActiveModal, RouterTestingModule, UserService, AccountService, FormBuilder]
    })
    .compileComponents();
     userService = TestBed.get(UserService);
     accountService = TestBed.get(AccountService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModalComponent);
    hostFixture = TestBed.createComponent(AccountEditComponent);
    hostFixture.detectChanges();
    component = fixture.componentInstance;
    let account = new Account();
    account.accountType = AccountType.CHECKING;
    account.activeStatus = true;
    account.balance = 100;
    account.id = 45;
    account.interestRate = 0.2;
    account.nickName = "dummy account";
    account.openDate = "08-23-2021";
    account.users = [new User()];
    component.account = account;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
