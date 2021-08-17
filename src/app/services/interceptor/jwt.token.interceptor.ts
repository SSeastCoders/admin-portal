import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { StorageService, Token } from "../storage/storage.service";


@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

    bearer: string;

  constructor(public storage: StorageService, private router: Router) {
      this.bearer = 'Bearer '
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedRequest = request.clone({
      setHeaders: {
        Authorization: Token.BEARER + `${this.storage.getToken()}`
      }
    });

    return next.handle(interceptedRequest);
  }
}
