import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { JwtTokenInterceptor } from './jwt.token.interceptor';

describe(`AuthHttpInterceptor`, () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtTokenInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });



});
