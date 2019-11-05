import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.class';

const baseUrl = "http://localhost:50288/api/users";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  login(username: string, password: string): Observable<User> | null {
    return this.http.get(`${baseUrl}/${username}/${password}`) as Observable<User>;
  }
  list(): Observable<User[]> {
    return this.http.get(`${baseUrl}`) as Observable<User[]>;
  }
  get(id: string): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`) as Observable<User>;
  }
  create(user: User): Observable<any> {
    return this.http.post(`${baseUrl}`, user) as Observable<any>;
  }
  change(user: User): Observable<any> {
    return this.http.put(`${baseUrl}/${user.id}`, user) as Observable<any>;
  }
  remove(user: User): Observable<any> {
    return this.http.delete(`${baseUrl}/${user.id}`) as Observable<any>;
  }

  constructor(private http: HttpClient) { }
}
