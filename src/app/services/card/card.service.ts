import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credit } from 'src/app/models/credit';
import { environment } from 'src/environments/environment';
import { ApiMethod, CardEndPoints, ICreditPagination, PageResponse } from '../const';
import { HttpService } from '../http/http.service';

const API_URL = environment.userUrl;
const api = environment.cardUrl + CardEndPoints.CREDIT;

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private router: Router,
    private https: HttpClient,
    private http: HttpService
  ) {}

  public getCardsPage(
    pageNumber: number,
    pageSize: number,
    sort?: string,
    asc?: boolean
  ) {
    let req;
    if (sort !== undefined) {
      req = `?page=${pageNumber}&size=${pageSize}&sort=${sort}&asc=${asc}`;
    } else {
      req = `?page=${pageNumber}&size=${pageSize}`;
    }

    return this.http.requestCallCard(
      CardEndPoints.CREDIT,
      ApiMethod.GET,
      ICreditPagination,
      req
    );
  }

  /**
   * TODO
   * @param accountId
   * @param page
   * @param pageSize
   * @returns
   */
  public getCardsByPage(
    page: number,
    pageSize: number,
    search?: string,
    fromAmount?: number,
    toAmount?: number,
    fromDate?: string,
    toDate?: string,
    status?: boolean,
    sort?: string,
    asc?: boolean
  ): Observable<PageResponse<Credit>> {
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
      status: status,
      sort: sort,
      asc: asc,
    });
    return this.https
      .get<PageResponse<Credit>>(req, {
        params: this.removeNullValuesFromQueryParams(queryParams),
      })
      .pipe(
        map((result) => {
          let transform = result.content.map((transaction) =>
            Object.assign(new Credit(), transaction)
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
}
