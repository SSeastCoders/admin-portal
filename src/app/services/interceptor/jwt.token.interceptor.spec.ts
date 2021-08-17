import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtTokenInterceptor } from './jwt.token.interceptor';
import { StorageService, Token } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { ReturnStatement } from '@angular/compiler';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe(`AuthHttpInterceptor`, () => {
  let service: StorageService;
  let httpMock: HttpTestingController;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientTestingModule],
      providers: [
        StorageService, {provide: Router, useClass: RouterTestingModule},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtTokenInterceptor,
          multi: true,
        },
      ],
    });


    service = TestBed.get(StorageService);
    httpMock = TestBed.get(HttpTestingController);
    client = TestBed.inject(HttpClient)
  });

  it('should add an Authorization header', () => {

    service.saveToken("somevalue");
    //Token.BEARER + `${this.storage.getToken()}
    //get<any>(`${environment.userUrl}`);
    client.get(`${environment.userUrl}`).subscribe(response => {
      return;
    })

    const httpRequest = httpMock.expectOne(`${environment.userUrl}`);

    expect(httpRequest.request.headers.get('Authorization')).toBe(Token.BEARER + `${service.getToken()}`,);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

});
