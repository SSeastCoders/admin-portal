import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCredit } from 'src/app/models/createCard';
import { environment } from 'src/environments/environment';
import { ApiMethod, CardEndPoints, ICreditPagination } from '../const';
import { HttpService } from '../http/http.service';

const API_URL = environment.userUrl;
const api = environment.userUrl + CardEndPoints.CREDIT;

@Injectable({
  providedIn: 'root'
})
export class CardService {

  creationError: boolean;
  creationErrorMessage: string;

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

  public createCard(card: CreateCredit) {
    return this.https.post(api, card).subscribe(
      (res) => {
        this.creationError = false;
        console.log('Card created');
        alert('Card created');
        this.router.navigate([CardEndPoints.CREDIT])
      },
      (err) => {
        console.log('Account could not be created');
        this.creationError = true;
        this.creationErrorMessage = err.error.message;
      }
    )
  }

}
