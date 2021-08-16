import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpService } from 'src/app/services/http/http.service';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, HttpService, AccountService,
        {provide: HttpClient, userClass: HttpClientTestingModule},
        {provide: HttpHandler, userClass: HttpClientTestingModule},
        //{provide: Router, userClass: RouterTestingModule.withRoutes([])},
        //{provide: Function, useClass: Function()}
      ],
      declarations: [ CreateAccountComponent ]
    })
    .compileComponents();

    service = TestBed.get(AccountService);
    serviceDependency = TestBed.get(HttpService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
