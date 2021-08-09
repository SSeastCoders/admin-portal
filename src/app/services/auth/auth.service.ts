import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserClass } from 'src/app/observables/loginUserClass';
import { TokenService } from './token.service';
import { environment } from "src/environments/environment";
import { Observable, of, throwError } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly TOKEN_STORAGE_KEY = 'token';
  redirectToUrl: string = '/users';
  loginError = false;
  loginUrl: string;
  

  constructor(private router: Router, private tokenService: TokenService, private http: HttpClient) {
    //this.redirectToUrl = '/users';
    this.loginError = false;
    this.loginUrl = "/login";
  }

  public login(credentials: LoginUserClass){
    //console.log("hello");
    this.tokenService.getResponseHeaders(credentials)
      .subscribe((res) => {
        //console.log(res);
        //console.log("authservice");
        this.saveToken(res.headers.get('authorization') || '');
        this.router.navigate([this.redirectToUrl]);
        //console.log(this.redirectToUrl);
        //console.log("Auth");
        //console.log(res.headers.get('authorization'));
        //console.log("hello");
        //console.log(res);
        //if (res.status == 401){
        //  console.log("401 error oops");
        //  throw HttpErrorResponse;
        //}
      },
      (err: HttpErrorResponse)=>{
        return this.tokenService.getResponseHeaders(credentials);
          //throw throwError;
        //console.log("error");
        //console.log(err);
      });
    return this.tokenService.getResponseHeaders(credentials); 
  }

  private saveToken(token: string) {
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, token);
    //console.log("token " + token);
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY) || '';
  }

  public logout(): void {
    this.tokenService.logout()
      .subscribe(() => {
        localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
      });
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
