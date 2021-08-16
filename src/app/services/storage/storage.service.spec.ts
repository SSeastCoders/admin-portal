import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { LoginUserClass } from 'src/app/observables/loginUserClass';
import { environment } from 'src/environments/environment';
import { createLogicalNot } from 'typescript';

import { TokenService } from './storage.service';

describe('TokenService', () => {
  let injector: TestBed;
  let service: TokenService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.apiUrl;
  let HttpResponseMock: HttpResponse<any> = {
    body: null,
    type: null,
    clone:null,
    status: 200,
    statusText: null,
    url: null,
    ok: true,
    headers: new HttpHeaders({ 'authorization': 'bearer token' })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(TokenService);//TestBed.inject(TokenService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: TokenService = TestBed.get(TokenService);
    expect(service).toBeTruthy();
  });


  it('should call login endpoint', () => {
    service.getResponseHeaders(new LoginUserClass('', ''))
    .subscribe((res: HttpResponse<any>) => {
      expect(res.headers.get('authorization')).toEqual('bearer token');
  });

    const req = httpMock.expectOne(apiUrl + '/login');
    expect(req.request.method).toBe("POST");
    req.flush({}, HttpResponseMock);
  });

  it('should call logout endpoint', () => {
    service.logout().subscribe(() => {});

    const req = httpMock.expectOne(apiUrl + '/logout');
    expect(req.request.method).toBe("GET");
    req.flush("");
  });

});