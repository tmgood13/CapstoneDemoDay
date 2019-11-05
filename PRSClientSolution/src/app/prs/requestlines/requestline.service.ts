import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestLine } from './requestline.class';

const baseUrl = "http://localhost:50288/api/requestlines";
@Injectable({
  providedIn: 'root'
})
export class RequestLineService {

  list(): Observable<RequestLine[]> {
    return this.http.get(`${baseUrl}`) as Observable<RequestLine[]>;
  }
  get(id: string): Observable<RequestLine> {
    return this.http.get(`${baseUrl}/${id}`) as Observable<RequestLine>;
  }
  create(requestline: RequestLine): Observable<any> {
    return this.http.post(`${baseUrl}`, requestline) as Observable<any>;
  }
  change(requestline: RequestLine): Observable<RequestLine> {
    return this.http.put(`${baseUrl}/${requestline.id}`, requestline) as Observable<RequestLine>;
  }
  remove(requestline: RequestLine): Observable<any> {
    return this.http.delete(`${baseUrl}/${requestline.id}`) as Observable<any>;
  }

  constructor(private http: HttpClient) { }
}
