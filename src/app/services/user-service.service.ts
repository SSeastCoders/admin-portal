import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUser } from '../observables/createUser';
import { User } from '../observables/user';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

  private users: string;
  private usersUrl: string;

  constructor(private http: HttpClient) {
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
}