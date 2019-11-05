import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.class';
import { SystemService } from '../system/system.service';
import { User } from '../../prs/user/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggeduser: string;
  user: User;
  loggedin: boolean = false;
  admrev: boolean = false;

  menus: Menu[] = [
    { display: 'Users', link: '/users/list', tip: 'User list'}, 
    { display: 'Vendors', link: '/vendors/list', tip: 'Vendor list'},
    { display: 'Products', link: '/products/list', tip: 'Product list'},
    { display: 'Requests', link: '/requests/list', tip: 'Request list'},
    { display: 'My Requests', link: '/requests/mylist', tip: 'My requests'},
    { display: 'Review', link: '/requests/review', tip: 'Requests to be reviewed'},
    { display: 'About', link: '/about', tip: 'About me'},
    { display: 'Logout', link: '/home', tip: 'Logout'},
  ];
  menunorm: Menu[] = [
    { display: 'Users', link: '/users/list', tip: 'User list'}, 
    { display: 'Vendors', link: '/vendors/list', tip: 'Vendor list'},
    { display: 'Products', link: '/products/list', tip: 'Product list'},
    { display: 'Requests', link: '/requests/list', tip: 'Request list'},
    { display: 'My Requests', link: '/requests/mylist', tip: 'My requests'},
    { display: 'About', link: '/about', tip: 'About me'},
    { display: 'Logout', link: '/home', tip: 'Logout'},
  ];
  menusmall: Menu[] = [
    { display: 'Login', link: '/home', tip: 'Logout'},
    { display: 'About', link: '/about', tip: 'About me'},
  ];

  constructor(
    private systemsvc: SystemService
  ) { }

  ngOnInit() {
    try{
      this.user = this.systemsvc.user;
      this.loggeduser = this.systemsvc.user.username;

      if(this.user != null) {
        this.loggedin = true;

        if(this.user.isAdmin == true || this.user.isReviewer == true) {
          this.admrev = true;
        }
      }

    } catch {

    }
  }

}
