import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';
import { RequestLine } from '../../requestlines/requestline.class';
import { RequestLineService } from '../../requestlines/requestline.service';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request: Request;
  verifyDelete: boolean = true;
  user: User;
  requestLines: RequestLine[] = [];
  products: Product[] = [];
  denied: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsvc: RequestService,
    private usersvc: UserService,
    private requestlinesvc: RequestLineService,
    private productsvc: ProductService,
    private systemsvc: SystemService
    ) { }

  save(): void {
    this.request.rejectionReason = null;
    this.request.status = "REVIEW";
    this.requestsvc.change(this.request).subscribe(
      res => { console.log("Response from request edit", res);
      this.router.navigateByUrl('/requests/list') 
    },
      err => { console.log(err); }
    );
  }
  
  edit(): void {
    this.router.navigateByUrl(`/requests/edit/${this.request.id}`);
  }
  verify(): void {
    this.verifyDelete = !this.verifyDelete;
  }
  delete(): void {
    this.requestsvc.remove(this.request).subscribe(
      res => { console.log("Response from request edit", res);
      this.router.navigateByUrl('/requests/list') 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let requestid = this.route.snapshot.params.id;
    this.requestsvc.get(requestid).subscribe(
      request => {
        this.request = request;
        if(this.request.status == "DENIED") {
          this.denied = true;
        }
      },
    );
    this.productsvc.list().subscribe(
      products => {
        this.products = products;
      }, 
      err => {
        console.error(err);
      }
    );
  }

}
