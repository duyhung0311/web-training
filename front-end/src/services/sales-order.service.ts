import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { SalesOrder } from 'src/model/sales-order.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class SalesOrderService {
  apiUrl: string = 'http://localhost:4040/sales_order';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Get all list contacts
  getAllList(): Observable<any> {
    return this.http.post(this.apiUrl + '/list', httpOptions);
  }
  create(data: SalesOrder): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(catchError(this.handleError));
  }
  getById(id: string): Observable<any> {
    return this.http
      .get(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleError));
  }
  update(id: string, data: SalesOrder): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }
  delete(id: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  delete_multiple(idArr: string[] = []): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/delete`, idArr)
      .pipe(catchError(this.handleError));
  }
  getContactName(data: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/search/${data}?contactName=${data}`)
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
