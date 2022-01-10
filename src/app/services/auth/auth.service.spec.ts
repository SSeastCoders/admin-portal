import { HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/models/createUser';
import { LoginUser } from 'src/app/models/loginUser';
import { environment } from 'src/environments/environment';
import { AuthEndPoints } from '../const';
import { StorageService } from '../storage/storage.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let tokenService: StorageService;
  let login: LoginUser;
  let httpMock: HttpTestingController;
  let token: string = 'fsgf';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    injector = getTestBed();
    service = injector.inject(AuthService);
    tokenService = injector.inject(StorageService);
    httpMock = TestBed.inject(HttpTestingController);

    token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFkbWluIiwiZXhwIjoxNjI5OTI5NzI0LCJ1c2VybmFtZSI6ImhhemVsIn0.WKCfX3IAps4sW_lfAtsliFvkkBWjOoPkqlttpq47dJRKRPfaMWkv9iFZ1fIo1k-eE2X5D8eJi0kAvl993samIw';

    login = {
      username: 'USERNAME',
      password: 'PASSWORD',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get role', () => {
    tokenService.saveToken(token);
    if (tokenService.getToken() == token) {
      expect(service.getRole()).toEqual('Admin');
    }
  });

  it('should save token', () => {
    service.saveToken(token);
    expect(tokenService.getToken()).toEqual(token);
  });

  it('should remove token on logout', () => {
    service.saveToken(token);
    if (tokenService.getToken() == token) {
      expect(tokenService.getToken()).toEqual(token);
    }
    service.logout();
    expect(tokenService.getToken()).toEqual('');
  });

  it('should get res headers', () => {
    let resHeaders = service.getResponseHeaders(login);
    expect(resHeaders).toBeTruthy();
  });

  it('should login', () => {
    service.login(login);

    const req = httpMock.expectOne({
      method: 'POST',
      url: environment.userUrl + AuthEndPoints.LOGIN,
    });

    req.flush([login]);
  });
});
