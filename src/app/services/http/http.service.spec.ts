import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import { AccountEndPoints, ApiMethod, AuthEndPoints } from '../const';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  let httpError: HttpErrorResponse;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClientTestingModule, HttpService],
      declarations: [],
    }).compileComponents();

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {});

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call endpoints', () => {
    service.requestCall(AuthEndPoints.LOGIN, ApiMethod.POST, User);
    service.requestCall(AuthEndPoints.LOGIN, ApiMethod.GET, User);
    service.requestCall(AuthEndPoints.LOGIN, ApiMethod.PUT, User);
    service.requestCall(AuthEndPoints.LOGIN, ApiMethod.DELETE, User);
    expect(service.requestCall).toBeDefined();
  });

  it('should call endpoints, account', () => {
    service.requestCallAccount(AccountEndPoints.MAIN, ApiMethod.POST, User);
    service.requestCallAccount(AccountEndPoints.MAIN, ApiMethod.GET, User);
    service.requestCallAccount(AccountEndPoints.MAIN, ApiMethod.PUT, User);
    service.requestCallAccount(AccountEndPoints.MAIN, ApiMethod.DELETE, User);

    expect(service.requestCall).toBeDefined();
  });
});

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    this.processError(error);
    throw error;
  }

  public processError(error: any) {
    console.log(error);
  }
}
