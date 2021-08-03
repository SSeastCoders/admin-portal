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
//?page=${page}&size=${size}
