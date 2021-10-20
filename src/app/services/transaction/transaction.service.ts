import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/models/transaction';
import { environment } from 'src/environments/environment';
import { PageResponse, TransactionEndPoints } from '../const';

const API_URL = environment.transactionUrl;
const api = API_URL + TransactionEndPoints.MAIN;

@Injectable({
  providedIn: 'root',
})

export class TransactionService {
  constructor(
    private https: HttpClient,
    private router: Router
  ) {}
  
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
  ) : Observable<PageResponse<Transaction>> {
    let req = `${api}/${accountId}?page=${page}&size=${pageSize}`;
    return this.https.get<PageResponse<Transaction>>(req);
  }

}
