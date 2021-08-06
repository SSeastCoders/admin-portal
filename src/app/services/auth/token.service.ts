import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { CATCH_ERROR_VAR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { catchError } from "rxjs/operators";
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
    return this.http.post(loginUrl, credentials, httpOptions);//.pipe(catchError(e => throwError(e)));//this.handleError(e)));
      //.subscribe(
      //  (res: HttpResponse<any>) => {console.log(res)},
      //  (err: HttpErrorResponse) => {console.log(err.status)});
    //return this.http.post(loginUrl, credentials, httpOptions);//, {observe: 'response'};
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Heelelefoinhergbeiuhb");
    return throwError(error);
  }
    /* console.log("get here");
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  } */

  public logout() {
    let logoutUrl = API_URL + this.logoutUrl;
    return this.http.get(logoutUrl, {responseType: 'text'});
  }

}

