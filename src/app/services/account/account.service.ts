import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateAccount } from 'src/app/models/createAccount';
import { environment } from 'src/environments/environment';
import { Account } from '../../models/account';
import { AccountEndPoints, UserEndPoints } from '../const';

const API_URL = environment.accountUrl;
const api = API_URL + AccountEndPoints.MAIN;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public currentAccount: Account;
  creationError: boolean;
  creationErrorMessage: string;

  constructor(private https: HttpClient, private router: Router) {
    this.creationError = false;
  }

  public findAll(): Observable<Account[]> {
    return this.https.get<Account[]>(api);
  }

  public find(accountId: number): Observable<Account> {
    return this.https.get<Account>(api+"/"+accountId);
  }

  public findCurrentAccount(accountId: number): void {
    this.https.get<Account>(api+"/"+accountId).subscribe(data => {
      this.currentAccount = data;
    });;
  }

  public createAccount(account: CreateAccount) {
    return this.https.post(api, account)
      .subscribe((res) =>{
        this.creationError = false;
        console.log("Account created");
        alert("Account created");
        this.router.navigate([UserEndPoints.MAIN]);
      },(err) =>{
        console.log(err);
        console.log("User could not be created");
        this.creationError = true;
        this.creationErrorMessage = err.error.message;
      }
    );
  }

}
