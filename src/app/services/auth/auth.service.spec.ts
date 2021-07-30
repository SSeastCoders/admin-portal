import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { LoginUserClass } from 'src/app/observables/loginUserClass';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(AuthService);
    tokenService = injector.get(TokenService);
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should have redirectToUrl option set to "users" by default', () => {
    expect(service.redirectToUrl).toEqual('/users');
  });

  it('should call token service for ResponseHeaders when logging in a user', () => {
    spyOn(tokenService, 'getResponseHeaders').and.returnValue(new Observable<HttpResponse<Object>>());
    service.login(new LoginUserClass('',''));
    expect(tokenService.getResponseHeaders).toHaveBeenCalled();
  });

  it('should return false from isLoggedIn() method by default', () => {
    expect(service.isLoggedIn()).toEqual(false);
  });

  it('should return false from isLoggedIn() method when user is logged out', () => {
    spyOn(tokenService, 'logout').and.returnValue(new Observable<string>());
    service.logout();
    expect(service.isLoggedIn()).toEqual(false);
  });

});
