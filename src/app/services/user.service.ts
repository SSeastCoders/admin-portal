import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.baseUrl + '/users';

  constructor(private http: HttpClient) {}

  public getUsersPage(
    page: number,
    size: number
  ): Observable<GetResponseUsers> {
    let t = '';
    //put token here

    let headersWt = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + t,
    });
    return this.http.get<GetResponseUsers>(
      `${this.api}?page=${page}&size=${size}`,
      {
        headers: headersWt,
      }
    );
  }

  // errorHandler(error: HttpErrorResponse) {
  //   return throwError('server error.');
  // }

  public getSortedUsersPage(
    page: number,
    size: number
    // sort: string
  ): Observable<GetResponseUsers> {
    let t =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFkbWluIiwiZXhwIjoxNjI4ODE5NDQ5LCJ1c2VybmFtZSI6ImhhemVsIn0.V9jCiH-IIiTG_Cbj7f48B_fiUmqu8HBmGr405jiRc2YRbmvt90wU1Koz38U9W_PGXoIp0EaTdnwc8WEkANtKyA';
    //put token here

    let headersWt = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + t,
    });
    return this.http.get<GetResponseUsers>(
      `${this.api}?page=${page}&size=${size}`,
      {
        headers: headersWt,
      }
    );
    // .pipe(catchError(this.errorHandler));
  }
}

interface GetResponseUsers {
  content: User[];

  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
