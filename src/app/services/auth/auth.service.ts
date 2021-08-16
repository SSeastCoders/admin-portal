import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService, Token } from '../storage/storage.service';
import { HttpService } from '../http/http.service';
import { ApiMethod, AuthEndPoints, UserEndPoints } from '../const';
import { LoginUser } from 'src/app/models/loginUser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { RoleTitle } from 'src/app/models/const';
import { JWT } from 'src/app/models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginErrorMessage: string = "Invalid credentials";
  loginError: boolean;
  redirectUrl: string = UserEndPoints.MAIN;

  constructor(private router: Router, private storage: StorageService, private http: HttpService) {
    this.loginError = false;
  }

  public login(credentials: LoginUser){
    return this.getResponseHeaders(credentials).subscribe(
      (res: HttpResponse<any>) => {
        if (res.status == 200) {
          this.saveToken(res?.headers?.get(Token.AUTHORIZATION) || '')
          if (this.getRole() == RoleTitle.ADMIN) {
            console.log(this.getRole());
            this.loginError = false;
            this.router.navigate([this.redirectUrl])
            console.log(res);
          }
          else {
            this.loginError = true;
            console.log("Customer Login, Invalid");
          }
        }
        else {
          this.loginError = true;
          console.log("Invalid Login");
        }
      }, (err: HttpErrorResponse) => {
        this.loginError = true;
        console.log("Invalid Login");
        console.error(err.error?.message);
      }
    );
  }

  private saveToken(token: string) {
    this.storage.saveToken(token);
  }

  public getToken(): string {
    return this.storage.getToken();
  }

  public logout(): void {
    this.storage.removeToken();
  }

  public isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  public getResponseHeaders(credentials: LoginUser) {
    return this.http.requestCall(AuthEndPoints.LOGIN, ApiMethod.POST, LoginUser, credentials);
  }

  public getRole(): RoleTitle {
    let tokenInfo: JWT = jwt_decode(this.getToken());
    return tokenInfo.role;
  }

}
