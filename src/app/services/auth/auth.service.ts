import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 import { LoginUserClass } from 'src/app/observables/loginUserClass';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  static readonly TOKEN_STORAGE_KEY = 'token';
  redirectToUrl: string = '/users';
 
  constructor(private router: Router, private tokenService: TokenService) { }

public login(credentials: LoginUserClass): void {
    this.tokenService.getResponseHeaders(credentials)
    .subscribe((res: HttpResponse<any>) => {
      this.saveToken(res.headers.get('authorization')||'');
      this.router.navigate([this.redirectToUrl]);
    });
}
 
  private saveToken(token: string){
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY)||'';
  }

}
