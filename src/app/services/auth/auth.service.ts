import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserClass } from 'src/app/observables/loginUserClass';
import { TokenService } from './token.service';
import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly TOKEN_STORAGE_KEY = 'token';
  redirectToUrl: string = '/users';

  constructor(private router: Router, private tokenService: TokenService) {
    //this.redirectToUrl = '/users';
  }

  public login(credentials: LoginUserClass): void {
    this.tokenService.getResponseHeaders(credentials)
      .subscribe((res: HttpResponse<any>) => {
        //console.log("authservice");
        this.saveToken(res.headers.get('authorization') || '');
        this.router.navigate([this.redirectToUrl]);
        //console.log(this.redirectToUrl);
        //console.log("Auth");
        //console.log(res.headers.get('authorization'));
      });
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
