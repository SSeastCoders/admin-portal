import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";
import {catchError} from 'rxjs/operators'; 


@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

    bearer: string;
 
  constructor(public auth: AuthService, private router: Router) {
      this.bearer = 'Bearer '
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedRequest = request.clone({
      setHeaders: {
        Authorization: this.bearer + `${this.auth.getToken()}`
      }
    });
 
    //console.log(this.bearer +`${this.auth.getToken()}`)
    return next.handle(interceptedRequest).pipe(catchError((x: HttpErrorResponse) => this.handleErrors(x)));
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      //this.auth.redirectToUrl = this.router.url;
      //this.router.navigate(['/login']);
      return of(err.message);
    }
    if (err.status === 404) {
      return of(err.message);
    }
    return of(err.message);
  }
}