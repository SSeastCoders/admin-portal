import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { CreateUser } from '../observables/createUser';
import { User } from '../observables/user';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';

const API_URL = environment.apiUrl;
const api = environment.apiUrl + '/users';


@Injectable()
export class UserService {

  private users: string;
  private usersUrl: string;
  private allUsers: User[];
  bearer: string;
  redirectToUrl: string = '/users';
  serverError = false;
  serverErrorMessage: string;
  userCreated: boolean;

  constructor(private http: HttpClient, private router: Router, public auth: AuthService) {
    this.users = "/users";
    this.usersUrl = API_URL + this.users;
    this.bearer = 'Bearer ';
    this.userCreated = false;
  }

  public findAll(): Observable<User[]> {
    //console.log(this.usersUrl);
    return this.http.get<User[]>(this.usersUrl);
  }

  public findAllUsernames(): string[] {
    //console.log(this.usersUrl);
    this.http.get<User[]>(this.usersUrl).subscribe(data => {
      this.allUsers = data});
    if (this.allUsers) {
    return this.allUsers.map(user => user.username);
    }
    return null;
  }

  public save(user: CreateUser) {
    return this.http.post<CreateUser>(this.usersUrl, user);
  }

  public createUser(user: CreateUser) {
    this.userCreated = false;
    this.serverError = false;
    return this.getNewUser(user)
      .subscribe((res) =>{
        //this.router.navigate(["/home"]);
        this.userCreated = true;
        //this.router.navigate([this.redirectToUrl]);
      },(err) =>{
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



