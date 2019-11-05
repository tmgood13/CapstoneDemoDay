import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../prs/user/user.class'
import { UserService } from '../../prs/user/user.service'


const baseUrl = "http://localhost:50288/api/users";
@Injectable({
  providedIn: 'root'
})
export class SystemService {

    user: User = null;
    usersvc: UserService;

    CheckLogin() {
        if(this.user == null) {
            this.router.navigateByUrl('/home')
        }
    }

    CheckAdmRev() {
        if(this.user.isAdmin == false && this.user.isReviewer == false) {
            this.router.navigateByUrl('/home')
        }
    }
    CheckAdmin() {
        if(this.user.isAdmin == false) {
            this.router.navigateByUrl('/home')
        }
    }
    
    login(username, password): Observable<User> | null {      
        return this.http.get(`${baseUrl}/${username}/${password}`) as Observable<User>;
    }    
    
    SetUser(user: User) { 
        this.user = user; 
    }

    GetUser(user: User) {
        return this.user;
    }
  
    ClearUser() {
        this.user = null;
    }
  
    constructor(
      private http: HttpClient,
      private router: Router,
    ) { }
}
