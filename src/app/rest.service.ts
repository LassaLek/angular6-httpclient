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
      .get(`${endpoint}product/${id}`)
      .pipe(map(this.extractData));
  }

  public addProduct(product): Observable<any> {
    return this.http
      .post<any>(endpoint + 'products', JSON.stringify(product), httpOptions)
      .pipe(
        map(
          tap(p => console.log(`added product with id ${p.id}`)),
          catchError()
        )
      );
  }

  private extractData(res: Response) {
    return res || {};
  }
}
