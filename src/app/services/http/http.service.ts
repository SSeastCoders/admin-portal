import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDetailsDto } from 'src/app/dto/user-details-dto';
import { Account } from 'src/app/models/account';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import {
  AccountEndPoints,
  ApiMethod,
  AuthEndPoints,
  CardEndPoints,
  SpecificAccount,
  SpecificCard,
  SpecificUser,
  UserEndPoints,
} from '../const';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  methods!: ApiMethod;

  constructor(
    private http: HttpClient //private _error: ErrorService;
  ) {}

  requestCall(
    api: AuthEndPoints | SpecificUser | UserEndPoints,
    method: ApiMethod,
    type: any,
    data?: any,
    id?: number
  ) {
    let response = new Observable<typeof type>();
    switch (method) {
      case ApiMethod.GET:
        console.log('from requestCall');
        console.log(data);
        response = this.http.get<typeof type[]>(
          `${environment.userUrl}${api}${data}`
        ); //.pipe(catchError(async (err) => this.handleError(err)));
        console.log('from requestCall');
        console.log(response);
        break;
      case ApiMethod.POST:
        response = this.http.post<typeof type>(
          `${environment.userUrl}${api}`,
          data,
          httpOptions
        ); //.pipe(catchError(async (err) => this.handleError(err)));
        break;
      case ApiMethod.PUT:
        console.log('in PUT case');
        console.log(data);
        response = this.http
          .put<typeof type>(`${environment.userUrl}${api}/${id}`, data)
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      case ApiMethod.DELETE:
        response = this.http
          .delete(`${environment.userUrl}${api}`, data)
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      default:
        break;
    }
    return response;
  }

  requestCallAccount(
    api: AccountEndPoints | SpecificAccount,
    method: ApiMethod,
    type: any,
    data?: any
  ) {
    let response = new Observable<typeof type>();
    switch (method) {
      case ApiMethod.GET:
<<<<<<< HEAD
        console.log('from requestCall');
        console.log(data);
        response = this.http
          .get<typeof type[]>(`${environment.accountUrl}${api}`, data)
          .pipe(catchError(async (err) => this.handleError(err)));
=======
        // console.log('from requestCall');
        // console.log(data);
        // response = this.http.get<typeof type[]>(
        //   `${environment.userUrl}${api}${data}`
        // ); //.pipe(catchError(async (err) => this.handleError(err)));
        // console.log('from requestCall');
        // console.log(response);
        console.log('from requestCall');
        console.log(data);

        response = this.http.get<typeof type[]>(
          `${environment.accountUrl}${api}${data}`
        );

        console.log('from requestCall');
        console.log(response);
>>>>>>> d895414 (CORS error; Also not receiving page object from back end correctly)
        break;
      case ApiMethod.POST:
        response = this.http
          .post<typeof type>(
            `${environment.accountUrl}${api}`,
            data,
            httpOptions
          )
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      case ApiMethod.PUT:
        response = this.http
          .put(`${environment.accountUrl}${api}`, data)
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      case ApiMethod.DELETE:
        response = this.http
          .delete(`${environment.accountUrl}${api}`, data)
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      default:
        break;
    }
    return response;
  }


  requestCallCard(
    api: CardEndPoints | SpecificCard,
    method: ApiMethod,
    type: any,
    data?: any
  ) {
    let response = new Observable<typeof type>();
    switch (method) {
      case ApiMethod.GET:
        response = this.http.get<typeof type[]>(
          `${environment.cardUrl}${api}${data}`
        ); //.pipe(catchError(async (err) => this.handleError(err)));
        break;
      case ApiMethod.POST:
        response = this.http
          .post<typeof type>(
            `${environment.cardUrl}${api}`,
            data,
            httpOptions
          )
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      case ApiMethod.PUT:
        response = this.http
          .put(`${environment.cardUrl}${api}`, data)
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      case ApiMethod.DELETE:
        response = this.http
          .delete(`${environment.cardUrl}${api}`, data)
          .pipe(catchError(async (err) => this.handleError(err)));
        break;
      default:
        break;
    }
    return response;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error: ', error.error.message);
      return error;
    } else {
      //this._error.whichError(error.status, error.message);
      return throwError({ error: error.message, statis: error.status });
    }
  }
}

// interface GetResponseUsers {
//   content: User[];

//   page: {
//     size: number;
//     totalElements: number;
//     totalPages: number;
//     number: number;
//   };

// interface GetResponseAccounts {
//   content: Account[];

//   page: {
//     size: number;
//     totalElements: number;
//     totalPages: number;
//     number: number;
//   };
//}
