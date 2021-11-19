import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateAccount } from 'src/app/models/createAccount';
import { UpdateAccount } from 'src/app/models/updateAccount';
import { environment } from 'src/environments/environment';
import { Account } from '../../models/account';
import { AccountEndPoints, ApiMethod, IAccountPagination, PageResponse } from '../const';
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

  /**
   * 
   * @param page page number
   * @param pageSize page size
   * @param search account nickname to searc
   * @param fromAmount starting amount of balance to filter
   * @param toAmount ending amount of balance to filter
   * @param fromDate starting date to filter
   * @param toDate ending date to filter
   * @param type account type to search
   * @param status account status to search
   * @param sort the sorting to search
   * @param asc asc or descedning when sorting
   * @returns 
   */
  public getAccountByPage(
    page: number,
    pageSize: number,
    search?: string,
    fromAmount?: number,
    toAmount?: number,
    fromDate?: string,
    toDate?: string,
    type?: string,
    status?: boolean,
    sort?: string,
    asc?: boolean
  ): Observable<PageResponse<Account>> {
    let req = `${api}`;
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      page: page,
      size: pageSize,
      nickname: search,
      fromAmount: fromAmount,
      toAmount: toAmount,
      fromDate: fromDate,
      toDate: toDate,
      type: type,
      status: status,
      sort: sort,
      asc: asc,
    });
    return this.https
      .get<PageResponse<Account>>(req, {
        params: this.removeNullValuesFromQueryParams(queryParams),
      })
      .pipe(
        map((result) => {
          let transform = result.content.map((transaction) =>
            Object.assign(new Account(), transaction)
          );
          result.content = transform;
          return result;
        })
      );
  }
  private removeNullValuesFromQueryParams(params: HttpParams) {
    const paramsKeysAux = params.keys();
    paramsKeysAux.forEach((key) => {
      const value = params.get(key); // returns a string
      if (value == 'null' || value == 'undefined' || value === '') {
        params['map'].delete(key);
      }
    });

    return params;
  }

  clear() {
    this.creationError = false;
    this.updateError = false;
    this.deletionError = false;
  }
}
