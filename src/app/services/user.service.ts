import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserPage } from '../models/userPage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.baseUrl + '/users';

  constructor(private http: HttpClient) {}

  public getUsers(page: number, size: number): Observable<UserPage<User>> {
    let t = ''; //put token here

    let headersWt = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + t,
    });
    return this.http.get<UserPage<User>>(
      `${this.api}?page=${page}&size=${size}`,
      {
        headers: headersWt,
      }
    );
  }
}

//?page=${page}&size=${size}
