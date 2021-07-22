import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";


@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

    bearer: string;
 
  constructor(public auth: AuthService) {
      this.bearer = 'Bearer '
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedRequest = request.clone({
      setHeaders: {
        Authorization: this.bearer + `${this.auth.getToken()}`
      }
    });
 
    //console.log(this.bearer +`${this.auth.getToken()}`)
    return next.handle(interceptedRequest);
  }
}