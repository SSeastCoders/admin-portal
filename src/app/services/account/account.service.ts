import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateAccount } from 'src/app/models/createAccount';
import { UpdateAccount } from 'src/app/models/updateAccount';
import { environment } from 'src/environments/environment';
import { Account } from '../../models/account';
import { AccountEndPoints, ApiMethod, IAccountPagination } from '../const';
import { HttpService } from '../http/http.service';

const API_URL = environment.accountUrl;
const api = API_URL + AccountEndPoints.MAIN;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public currentAccount: Account;
  creationError: boolean;
  creationErrorMessage: string;
  updateError: boolean;
  deletionError: boolean;
  deletionErrorMessage: string;
  updateErrorMessage: string;

  constructor(
    private https: HttpClient,
    private router: Router,
    private http: HttpService
  ) {
    this.creationError = false;
    this.updateError = false;
    this.deletionError = false;
  }

  public findAll(): Observable<Account[]> {
    return this.https.get<Account[]>(api);
  }

  public find(accountId: number): Observable<Account> {
    return this.https.get<Account>(api + '/' + accountId);
  }

  public delete(accountId: number) {
    return this.https.delete<any>(api + '/' + accountId).subscribe(
      (res) => {
        this.deletionError = false;
        console.log('Account deleted');
        alert('Account deleted');
        this.router.navigate([AccountEndPoints.MAIN]);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        console.log('Account could not be deleted');
        this.deletionError = true;
        this.deletionErrorMessage = err.error.message;
      }
    );
  }

  public findCurrentAccount(accountId: number): void {
    this.https.get<Account>(api + '/' + accountId).subscribe((data) => {
      this.currentAccount = data;
    });
  }

  public createAccount(account: CreateAccount) {
    return this.https.post(api, account).subscribe(
      (res) => {
        this.creationError = false;
        console.log('Account created');
        alert('Account created');
        this.router.navigate([AccountEndPoints.MAIN]);
      },
      (err) => {
        console.log(err);
        console.log('Account could not be created');
        this.creationError = true;
        this.creationErrorMessage = err.error.message;
      }
    );
  }

  public updateAccount(account: UpdateAccount) {
    console.log(JSON.stringify(account));
    return this.https.put(api + '/' + account.id, account).subscribe(
      (res) => {
        console.log(res);
        //expect(res?.status == 206);
        this.creationError = false;
        console.log('Account updated');
        alert('Account updated');
        //this.router.navigate([UserEndPoints.MAIN]);
      },
      (err) => {
        console.log(err);
        console.log('Account could not be updated');
        if (err?.status == 404) {
          this.creationError = true;
          this.creationErrorMessage = err.error.message;
        } else if (err?.status == 412) {
          this.updateError = true;
          this.updateErrorMessage = err.error.message;
        }
      }
    );
  }

  public getAccountsPage(
    page: number,
    size: number,
    sort?: string,
    asc?: boolean
  ): Observable<any> {
    let req = `/accountsPage?page=${page}&size=${size}`;

    if (sort !== undefined) {
      req += `&sort=${encodeURIComponent(sort)}&asc=${encodeURIComponent(
        !!asc
      )}`;
    }

    console.log(req);
    return this.http.requestCallAccount(
      AccountEndPoints.MAIN,
      ApiMethod.GET,
      IAccountPagination,
      req
    );
  }

  clear() {
    this.creationError = false;
    this.updateError = false;
    this.deletionError = false;
  }
}
