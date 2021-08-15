import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../observables/createUser';
import { User } from '../observables/user';

import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.baseUrl + '/users';

  private users: string;
  private usersUrl: string;
  private allUsers: User[];
  bearer: string;
  redirectToUrl: string = '/users';
  serverError = false;
  serverErrorMessage: string;
  userCreated: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    public auth: AuthService
  ) {
    this.users = '/users';
    this.usersUrl = API_URL + this.users;
    this.bearer = 'Bearer ';
    this.userCreated = false;
  }

  public getUsersPage(
    page: number,
    size: number,
    sort?: string,
    asc?: boolean
  ): Observable<GetResponseUsers> {
    let req;
    if (sort !== undefined) {
      req = `${this.api}?page=${page}&size=${size}&sort=${sort}&asc=${!!asc}`;
    } else {
      req = `${this.api}?page=${page}&size=${size}`;
    }
    console.log('this is the request');
    console.log(req);
    return this.http.get<GetResponseUsers>(req);
  }

  // errorHandler(error: HttpErrorResponse) {
  //   return throwError('server error.');
  // }

  // public getSortedUsersPage(
  //   page: number,
  //   size: number,
  //   asc: boolean,
  //   sort: string
  // ): Observable<GetResponseUsers> {
  //   return this.http.get<GetResponseUsers>(
  //     `${this.api}?page=${page}&size=${size}`
  //   );
  //   // .pipe(catchError(this.errorHandler));
  // }

  public findAll(): Observable<User[]> {
    //console.log(this.usersUrl);
    return this.http.get<User[]>(this.usersUrl);
  }

  // public findAllUsernames(): string[] {
  //   //console.log(this.usersUrl);
  //   // this.http.get<User[]>(this.usersUrl).subscribe((data) => {
  //   //   this.allUsers = data;
  //   // });
  //   // if (this.allUsers) {
  //   //   return this.allUsers.map((user) => user.username);
  //   // }
  //   // return null;
  // }

  public save(user: CreateUser) {
    return this.http.post<CreateUser>(this.usersUrl, user);
  }

  public createUser(user: CreateUser) {
    this.serverError = false;
    return this.getNewUser(user).subscribe(
      (res) => {
        //this.router.navigate(["/home"]);
        this.userCreated = true;
        //this.router.navigate([this.redirectToUrl]);
      },
      (err) => {
        console.log(err);
        this.serverError = true;
        this.serverErrorMessage = err.error.message;
      }
    );
    //return this.getNewUser(user);
  }

  //public getNewUser(user: CreateUser) {
  //return this.http.post(this.usersUrl, user);
  //}

  public getNewUser(user: CreateUser) {
    return this.http.post(this.usersUrl, user);
    //throw new Error('Function not implemented.');
  }

  public getServerError() {
    return this.serverError;
  }

  public getServerErrorMessage() {
    return this.serverErrorMessage;
  }

  public clear(): void {
    this.serverError = false;
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
