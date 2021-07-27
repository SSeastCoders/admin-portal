import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUser } from '../observables/createUser';
import { User } from '../observables/user';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

  private users: string;
  private usersUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.users = "/users";
    this.usersUrl = API_URL + this.users;
  }

  public findAll(): Observable<User[]> {
    console.log(this.usersUrl);
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: CreateUser) {
    return this.http.post<CreateUser>(this.usersUrl, user);
  }

  public createUser(user: CreateUser): void {
    this.getNewUser(user)
    .subscribe()
      this.router.navigate(["/home"]);
    //return this.http.post<CreateUser>(this.usersUrl, user);
  }

  //public getNewUser(user: CreateUser) {
    //return this.http.post(this.usersUrl, user);
  //}


  public getNewUser(this: any, user: CreateUser) {
    return this.http.post(this.usersUrl, user);
    //throw new Error('Function not implemented.');
  }
}

