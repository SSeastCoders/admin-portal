import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreateUser } from '../../models/createUser';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';
import { ApiMethod, IUserPagination, UserEndPoints } from '../const';
import { UserDetailsDto } from 'src/app/dto/user-details-dto';

const API_URL = environment.userUrl;
const api = environment.userUrl + UserEndPoints.MAIN;

@Injectable()
export class UserService {
  bearer: string;
  redirectToUrl: string = '/users';
  creationError: boolean;
  creationErrorMessage: string;
  userCreated: boolean;

  constructor(
    private https: HttpClient,
    private router: Router,
    private http: HttpService
  ) {
    this.bearer = 'Bearer ';
    this.userCreated = false;
    this.creationError = false;
  }

  public createUser(user: CreateUser) {
    return this.https.post(api, user).subscribe(
      (res) => {
        this.creationError = false;
        console.log('User created');
        alert('User created');
        this.router.navigate([UserEndPoints.MAIN]);
      },
      (err) => {
        console.log(err);
        console.log('User could not be created');
        this.creationError = true;
        this.creationErrorMessage = err.error.message;
      }
    );
  }

  clear() {
    this.creationError = false;
  }

  public getUser(id: number) {
    //return this.https.get<User>(api + `/${id}`);
    return this.http.requestCall(
      UserEndPoints.MAIN,
      ApiMethod.GET,
      User,
      '/' + id
    );
  }

  public searchUsers(keyword: string) {
    console.log(keyword);
    console.log(api + `/search?keyword=${keyword}`);
    return this.https.get<User[]>(api + `/search?keyword=${keyword}`);
  }

  public updateUser(editUser: UserDetailsDto): any {
    console.dir(editUser);
    return this.http.requestCall(
      UserEndPoints.MAIN,
      ApiMethod.PUT,
      UserDetailsDto,
      editUser,
      editUser.id
    );
  }

  public getUsersPage(
    page: number,
    size: number,
    sort?: string,
    asc?: boolean
  ): Observable<any> {
    let req;
    if (sort !== undefined) {
      req = `?page=${page}&size=${size}&sort=${sort}&asc=${!!asc}`;
    } else {
      req = `?page=${page}&size=${size}`;
    }
    console.log(req);
    return this.http.requestCall(
      UserEndPoints.MAIN,
      ApiMethod.GET,
      IUserPagination,
      req
    );
  }
}
