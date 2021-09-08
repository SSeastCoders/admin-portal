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

  //CURRENTLY NOT BEING USED
  /*public save(user: CreateUser) {
    return this.http.requestCall(UserEndPoints.MAIN, ApiMethod.POST, CreateUser, user).subscribe(
      (res: HttpResponse<any>) => {
        if (res.status == 201){
          console.log("User created");console.log(res.status); console.log(res.statusText);
          this.creationError = false;
          return res;
        }
        else if (res.status == 409) {
          console.log("Duplicate user");
          this.creationError = true;
          this.creationErrorMessage = res.statusText;
          console.log(res);console.log(res.status); console.log(res.statusText);
          return res.body;
        }
        else {
          console.log("Could not create user");
          this.creationError = true;
          this.creationErrorMessage = res.statusText;
          console.log(res); console.log(res.status); console.log(res.statusText);
          return res.body;
        }
      }, (err: HttpErrorResponse) => {
        console.log("Could not create user");
        this.creationError = true;
        this.creationErrorMessage = err.error.message;
        return err;
      });
  }*/

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
    return this.http.requestCall(
      UserEndPoints.MAIN,
      ApiMethod.GET,
      User,
      '/' + id
    );
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
    asc?: boolean,
    roleFilter?: string,
    statusFilter?: string
  ): Observable<any> {
    let req = ``;

    let predicateCount = 0;

    let delimeter = '?';

    if (statusFilter == 'active' || statusFilter == 'inactive') {
      req += '/' + `${encodeURIComponent(statusFilter)}`;
    }

    if (roleFilter == 'Admin' || roleFilter == 'Customer') {
      delimeter = predicateCount >= 1 ? '&' : '?';
      predicateCount++;
      req += delimeter + `role=${encodeURIComponent(roleFilter)}`;
    }

    delimeter = predicateCount >= 1 ? '&' : '?';

    req +=
      delimeter +
      `page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`;

    if (sort !== undefined) {
      req += `&sort=${encodeURIComponent(sort)}&asc=${encodeURIComponent(
        !!asc
      )}`;
    }

    return this.http.requestCall(
      UserEndPoints.MAIN,
      ApiMethod.GET,
      IUserPagination,
      req
    );
  }
}
