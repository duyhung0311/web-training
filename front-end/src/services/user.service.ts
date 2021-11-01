import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {User} from './../model/user.model'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = 'http://localhost:4040/user_management/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new User();
  constructor(private httpClient: HttpClient) {}
  // Show lists of item
  get(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(catchError(this.handleError));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get(this.apiUrl + `${id}`)
      .pipe(catchError(this.handleError));
  }

  create(user: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, user);
  }
  update(id: string, user: any): Observable<any> {
    return this.httpClient
      .put(`${this.apiUrl}/${id}`, user)
      .pipe(catchError(this.handleError));
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
