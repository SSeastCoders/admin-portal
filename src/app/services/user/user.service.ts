import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CreateUser } from '../../models/createUser';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';
import { ApiMethod, UserEndPoints } from '../const';

const API_URL = environment.userUrl;
const api = environment.userUrl + UserEndPoints.MAIN;


@Injectable()
export class UserService {

  private users: string;
  private usersUrl: string;
  private allUsers: User[];
  bearer: string;
  redirectToUrl: string = '/users';
  creationError: boolean;
  creationErrorMessage: string;
  userCreated: boolean;

  constructor(private https: HttpClient, private router: Router, public auth: AuthService, private http: HttpService) {
    this.users = "/users";
    this.usersUrl = API_URL + this.users;
    this.bearer = 'Bearer ';
    this.userCreated = false;
    this.creationError = false;
  }

  public save(user: CreateUser) {
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
  }

  public createUser(user: CreateUser) {
    return this.https.post(api, user)
      .subscribe((res) =>{
        this.creationError = false;
        console.log("User created");
        alert("User created");
        this.router.navigate([UserEndPoints.MAIN]);
      },(err) =>{
        console.log(err);
        console.log("User could not be created");
        this.creationError = true;
        this.creationErrorMessage = err.error.message;
      }
    );
  }

  clear(){
    this.creationError = false;
  }

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
    return this.https.get<GetResponseUsers>(
      `${api}?page=${page}&size=${size}`,
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



