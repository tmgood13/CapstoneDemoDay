import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  verifyDelete: boolean = true;
  
  phone1: string = null;
  phone2: string = null;
  phone3: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersvc: UserService,
    private systemsvc: SystemService
    ) { }

  save(): void {
    if(this.phone1 != null && this.phone2 != null && this.phone3 != null) {
      this.user.phone = this.phone1 + "-" + this.phone2 + "-" + this.phone3;    
    }      
    this.usersvc.change(this.user).subscribe(
      res => { console.log("Response from user edit", res);
      this.router.navigateByUrl('/users/list') 
    },
      err => { console.log(err); }
    );
  }
  edit(): void {
    this.router.navigateByUrl(`/users/edit/${this.user.id}`);
  }
  verify(): void {
    this.verifyDelete = !this.verifyDelete;
  }
  delete(): void {
    this.usersvc.remove(this.user).subscribe(
      res => { console.log("Response from user edit", res);
      this.router.navigateByUrl('/users/list') 
    },
      err => { console.log(err); }
    );
  }
  viewpass() {
    var x = document.getElementById("passfield");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let userid = this.route.snapshot.params.id;
    this.usersvc.get(userid).subscribe(
      user => {
        this.user = user;
        if(this.user.id != this.systemsvc.user.id && !this.systemsvc.user.isAdmin) {
          this.router.navigateByUrl('/users/list') 
        }
      },
      err => { console.error(err); }
    );
  }

}
