import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginUserClass } from "src/app/observables/loginUserClass";
import { environment } from "src/environments/environment";
 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};
const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
  })
export class TokenService {

  private loginUrl: string;
  private logoutUrl: string;
 
  constructor(private http: HttpClient) { 
    this.loginUrl = "/login";
    this.logoutUrl = "/logout";
  }
 
  public getResponseHeaders(credentials: LoginUserClass) {
    let loginUrl = API_URL + this.loginUrl;
    //console.log("get token");
    return this.http.post(loginUrl, credentials, httpOptions);//, {observe: 'response'};
  }

  public logout() {
    let logoutUrl = API_URL + this.logoutUrl;
    return this.http.get(logoutUrl, {responseType: 'text'});
  }

}

