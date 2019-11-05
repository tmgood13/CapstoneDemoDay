import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  sortCriteria: string = "username";
  sortOrder: string = "asc";
  searchCriteria: string = "";

  sortBy(prop: string): void {
    if(prop === this.sortCriteria) {
      this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    }
    this.sortCriteria = prop;
  }

  constructor(
    private usersvc: UserService,
    private systemsvc: SystemService
  ) { }

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
  }
}
