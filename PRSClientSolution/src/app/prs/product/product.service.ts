import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.class';

const baseUrl = "http://localhost:50288/api/products";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  list(): Observable<Product[]> {
    return this.http.get(`${baseUrl}`) as Observable<Product[]>;
  }
  get(id: string): Observable<Product> {
    return this.http.get(`${baseUrl}/${id}`) as Observable<Product>;
  }
  create(product: Product): Observable<any> {
    return this.http.post(`${baseUrl}`, product) as Observable<any>;
  }
  change(product: Product): Observable<any> {
    return this.http.put(`${baseUrl}/${product.id}`, product) as Observable<any>;
  }
  remove(product: Product): Observable<any> {
    return this.http.delete(`${baseUrl}/${product.id}`) as Observable<any>;
  }

  constructor(private http: HttpClient) { }
}
