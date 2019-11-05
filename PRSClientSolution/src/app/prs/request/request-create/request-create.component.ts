import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request();
  users: User[] = [];

  constructor(
    private router: Router,
    private requestsvc: RequestService,
    private usersvc: UserService,
    private systemsvc: SystemService
  ) { }

  save(): void {
    this.requestsvc.create(this.request).subscribe(
      res => { console.log("Response from request create", res);
      this.router.navigateByUrl(`/requests/detail/${res.id}`);
    },
    err => { console.log(err); }
    );    
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    this.usersvc.list().subscribe(
      users => {
        this.users = users;
      }, 
      err => {
        console.error(err);
      }
    );
    this.request.userId = this.systemsvc.user.id;
  }

}
