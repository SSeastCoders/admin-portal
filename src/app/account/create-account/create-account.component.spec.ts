import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpService } from 'src/app/services/http/http.service';
import { isPropertyAssignment } from 'typescript';

import { CreateAccountComponent } from './create-account.component';

class HttpClientStub {
  HttpClientTestingModule: HttpClientTestingModule;
}

class HttpHandlerStub {
  HttpHandlerTestingModule: HttpClientTestingModule;
}

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let service: AccountService;
  let serviceDependency: HttpService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormBuilder,
        HttpService,
        AccountService,
        { provide: HttpClient, userClass: HttpClientTestingModule },
        { provide: HttpHandler, userClass: HttpClientTestingModule },
        //{provide: Router, userClass: RouterTestingModule.withRoutes([])},
        //{provide: Function, useClass: Function()}
      ],
      declarations: [CreateAccountComponent],
    }).compileComponents();

    service = TestBed.get(AccountService);
    serviceDependency = TestBed.get(HttpService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fb = new FormBuilder();
    component.accountForm = fb.group({
      accountType: ['', []],
      users: fb.array([]),
      nickName: ['', []],
    });

    component.accountForm.patchValue({
      accountType: '1: SAVING',
      nickName: 'NICKNAME',
    });
    component.accountForm.patchValue([
      { users: [{ user: 34 }, { user: 34 }, { user: 2 }] },
    ]);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // THIS TEST IS NOT PASSING
  // it('should generate account', () => {
  //   component.account = component.generateAccount();
  //   expect(component.account.interestRate).toEqual(0.01);
  //   expect(component.account.openDate).toEqual(
  //     Date.parse(
  //       new Date().getFullYear() +
  //         '-' +
  //         new Date().getMonth() +
  //         '-' +
  //         new Date().getDate()
  //     )
  //   );
  //   expect(component.account.balance).toEqual(0);
  //   expect(component.account.activeStatus).toEqual(true);
  // });
});
