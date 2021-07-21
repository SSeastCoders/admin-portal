// import { HttpHeaders, HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { LoginUserClass } from "src/app/observables/loginUserClass";
// import { environment } from "src/environments/environment";

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
//   observe: 'response' as 'response'
// };
// const API_URL = environment.apiUrl;
 
// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
 
//   constructor(private http: HttpClient) { }
 
//   public getResponseHeaders(credentials: LoginUserClass) {
//     let loginUrl = API_URL + '/login';
//     return this.http.post(loginUrl, credentials, httpOptions);
//   }
// }