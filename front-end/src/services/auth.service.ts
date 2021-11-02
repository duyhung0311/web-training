import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Auth } from 'src/model/auth.model';
import { Router } from '@angular/router';
import {AuthInterceptor} from './../services/authconfig.interceptor'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:4040';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  login(auth: Auth): Observable<any> {
    return this.http.post(this.endpoint + '/signin', auth, httpOptions);
  }
  signIn(auth: Auth) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, auth)
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
      this.router.navigate(['login']);
    }
  }
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/userProfile`;
    return this.http.get(api, { headers: this.headers });
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
