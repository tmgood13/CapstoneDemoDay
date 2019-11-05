import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../prs/user/user.service';
import { User } from '../../prs/user/user.class';
import { LoginService } from '../logger/login.service';
import { SystemService } from '../system/system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userslist: User[] = [];
  user: User;
  username: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private usersvc: UserService,
    private loginsvc: LoginService,
    private systemsvc: SystemService,
    private router: Router
  ) { }

  login() {      
    this.usersvc.login(this.username, this.password).subscribe(
      res => {
        this.user = res;
        this.systemsvc.SetUser(this.user);
        this.router.navigateByUrl('/requests/list');
      }, 
      err => {
        console.error(err);
      }
    );
  }    

  SetUser(user: User) { 
    this.user = user; 
  }

  GetUser(user: User) {
    return this.user;
  }

  ngOnInit() {
    this.usersvc.list().subscribe(
      users => {
        this.userslist = users;
      }, 
      err => {
        console.error(err);
      }
    ); 
    this.systemsvc.ClearUser();
  }  
}
