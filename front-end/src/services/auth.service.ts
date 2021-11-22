import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Auth } from 'src/model/auth.model';
import { Router } from '@angular/router';
import { AuthInterceptor } from './../services/authconfig.interceptor';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:4040';
  apiUrl: string = 'http://localhost:4040/user_management';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) {}
  login(auth: Auth): Observable<any> {
    return this.http.post(this.endpoint + '/signin', auth, httpOptions);
  }
  //   getById(id: string): Observable<any> {
  //   return this.httpClient
  //     .get(this.apiUrl + `${id}`)
  //     .pipe(catchError(this.handleError));
  // }
  signIn(auth: Auth) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, auth)
      .pipe(catchError(this.handleError))
      .subscribe((res: any) => {
        localStorage.setItem('auth-token', res.token);
      });
  }
  getToken() {
    return sessionStorage.getItem('auth-token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('auth-token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('auth-token');
    if (removeToken == null) {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
    localStorage.removeItem('isLoggedIn');
     localStorage.removeItem('isAdmin');
  }
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/userProfile`;
    return this.http.get(api, { headers: this.headers });
  }

  // Error
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
