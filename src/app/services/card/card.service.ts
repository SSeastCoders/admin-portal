import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiMethod, CardEndPoints, ICreditPagination } from '../const';
import { HttpService } from '../http/http.service';

const API_URL = environment.userUrl;
const api = environment.userUrl + CardEndPoints.CREDIT;

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private router: Router, private https: HttpClient, private http: HttpService) { }


  public getCardsPage(pageNumber: number, pageSize: number, sort?: string, asc?: boolean) {
    let req;
    if (sort !== undefined) {
      req = `?page=${pageNumber}&size=${pageSize}&sort=${sort}&asc=${asc}`
    } else {
      req = `?page=${pageNumber}&size=${pageSize}`;
    }

    return this.http.requestCallCard(
      CardEndPoints.CREDIT,
      ApiMethod.GET,
      ICreditPagination,
      req
    )

  }

}
