import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/models/transaction';
import { environment } from 'src/environments/environment';
import { PageResponse, TransactionEndPoints } from '../const';

const API_URL = environment.transactionUrl;
const api = API_URL + TransactionEndPoints.MAIN;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private https: HttpClient, private router: Router) {}

  /**
   * TODO
   * @param accountId
   * @param page
   * @param pageSize
   * @returns
   */
  public getTransactionsByAccount(
    accountId: number,
    page: number,
    pageSize: number,
    search?: string,
    fromAmount?: number,
    toAmount?: number,
    fromDate?: string,
    toDate?: string
  ): Observable<PageResponse<Transaction>> {
    let req = `${api}/${accountId}`;
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      page: page,
      size: pageSize,
      search: search,
      fromAmount: fromAmount,
      toAmount: toAmount,
      fromDate: fromDate,
      toDate: toDate
    });
    return this.https
      .get<PageResponse<Transaction>>(req, {
        params: this.removeNullValuesFromQueryParams(queryParams),
      })
      .pipe(
        map((result) => {
          let transform = result.content.map(transaction => Object.assign(new Transaction(), transaction));
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
}
