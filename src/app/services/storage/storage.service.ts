
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

export enum Token {
  TOKEN = 'token',
  AUTHORIZATION = 'authorization',
  BEARER = 'Bearer '
}

@Injectable({
    providedIn: 'root'
  })
export class StorageService {

  constructor(private http: HttpService) {}

  public saveToken(token: string) {
    localStorage.setItem(Token.TOKEN, token);
  }

  public getToken(): string {
    return localStorage.getItem(Token.TOKEN) || '';
  }

  public removeToken(): void {
    localStorage.removeItem(Token.TOKEN);
  }

  public setLocalObject(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public getLocalObject(key: string) {
    return localStorage.getItem(key);
  }

  public removeLocalObject(key: string) {
    localStorage.removeItem(key);
  }
}

