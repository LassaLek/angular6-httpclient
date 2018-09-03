import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const endpoint = '';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<any> {
    return this.http
      .get(endpoint + 'products')
      .pipe(map(this.extractData));
  }

  public getProduct(id: Number): Observable<any> {
    return this.http
      .get(`${endpoint}products/${id}`)
      .pipe(map(this.extractData));
  }

  public addProduct(product: ProductModel): Observable<any> {
    return this.http
      .post<any>(endpoint + 'products', JSON.stringify(product), httpOptions)
      .pipe(
        map(
          tap(p => console.log(`added product with id ${p.id}`)),
          catchError(this.handleError<any>('addProduct'))
        )
      );
  }

  public updateProduct(id: Number, product: ProductModel): Observable<any> {
    return this.http
      .put(`${endpoint}product/${id}`, JSON.stringify(product), httpOptions)
      .pipe(
        map(
          tap(_ => console.log(`updated product with id ${id}`)),
          catchError(this.handleError<any>('updateProduct'))
        )
      );
  }

  public deleteProduct(id: Number): Observable<any> {
    return this.http
      .delete<any>(`${endpoint}product/${id}`, httpOptions)
      .pipe(        map(
        tap(_ => console.log(`deleted product with id ${id}`)),
        catchError(this.handleError<any>('deleteProduct'))
      ));
  }

  private extractData(res: Response) {
    return res || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}

interface ProductModel {
  id: Number;
}
