import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../observables/account';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account: string;
  private accountUrl: string;
  private allAccounts: Account[];

  constructor(private http: HttpClient, private router: Router) {
    this.account = "/users";
    this.accountUrl = API_URL + this.account;
  }

  public findAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl);
  }

}
