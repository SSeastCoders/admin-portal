import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private api = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    let t = 'nfwnie;rewi;ure'; //put token here

    let headersWt = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + t,
    });

    return this.http.get<Employee[]>(`${this.api}/users`, {
      headers: headersWt,
    });
  }
}
