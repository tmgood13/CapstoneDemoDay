import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from './vendor.class';

const baseUrl = "http://localhost:50288/api/vendors";
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  list(): Observable<Vendor[]> {
    return this.http.get(`${baseUrl}`) as Observable<Vendor[]>;
  }
  get(id: string): Observable<Vendor> {
    return this.http.get(`${baseUrl}/${id}`) as Observable<Vendor>;
  }
  create(vendor: Vendor): Observable<any> {
    return this.http.post(`${baseUrl}`, vendor) as Observable<any>;
  }
  change(vendor: Vendor): Observable<any> {
    return this.http.put(`${baseUrl}/${vendor.id}`, vendor) as Observable<any>;
  }
  remove(vendor: Vendor): Observable<any> {
    return this.http.delete(`${baseUrl}/${vendor.id}`) as Observable<any>;
  }

  constructor(private http: HttpClient) { }
}
