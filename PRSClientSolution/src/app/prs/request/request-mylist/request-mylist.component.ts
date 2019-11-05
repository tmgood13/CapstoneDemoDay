import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';
import { RequestLine } from '../../requestlines/requestline.class';
import { RequestLineService } from '../../requestlines/requestline.service';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-request-mylist',
  templateUrl: './request-mylist.component.html',
  styleUrls: ['./request-mylist.component.css']
})
export class RequestMylistComponent implements OnInit {

  requests: Request[] = [];
  users: User[] = [];
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  searchCriteria: string = "";
  myid: string;

  sortBy(prop: string): void {
    if(prop === this.sortCriteria) {
      this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    }
    this.sortCriteria = prop;
  }

  constructor(
    private requestsvc: RequestService,
    private usersvc: UserService,
    private systemsvc: SystemService,
  ) { }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    this.myid = this.systemsvc.user.id.toString();
    this.requestsvc.mylist(this.myid).subscribe(
      requests => {
        this.requests = requests;
      }, 
      err => {
        console.error(err);
      }
    );
    this.usersvc.list().subscribe(
      users => {
        this.users = users;
      }, 
      err => {
        console.error(err);
      }
    );
  }
}
