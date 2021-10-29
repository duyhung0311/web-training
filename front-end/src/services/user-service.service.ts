import { Injectable } from '@angular/core';
import {retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from 'src/model/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  apiUrl: string = 'http://localhost:4040/user_management';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(catchError(this.handleError));
  }
  // create(data: any): Observable<any> {
  //   return this.httpClient
  //     .post(this.apiUrl, data)
  //     .pipe(catchError(this.handleError));
  // }
  createEmployee(user:any): Observable<User> {
    return this.httpClient
      .post<User>(this.apiUrl, JSON.stringify(user), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
