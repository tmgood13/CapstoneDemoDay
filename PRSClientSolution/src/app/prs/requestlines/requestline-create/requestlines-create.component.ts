import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../request/request.service';
import { Request } from '../../request/request.class';
import { RequestLineService } from '../requestline.service';
import { RequestLine } from '../requestline.class';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-requestlines-create',
  templateUrl: './requestlines-create.component.html',
  styleUrls: ['./requestlines-create.component.css']
})
export class RequestLineCreateComponent implements OnInit {

  requestline: RequestLine = new RequestLine();
  request: Request;
  products: Product[] = [];
  rltotal: number = 0;
  product: Product;
  requestid: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsvc: RequestService,
    private requestlinesvc: RequestLineService,
    private productsvc: ProductService,
    private systemsvc: SystemService
  ) { }

  save(): void {
    this.requestline.requestId = Number(this.requestid);
    this.request.status = "REVIEW";
    this.requestlinesvc.create(this.requestline).subscribe(
      res => { console.log("Response from request line create", res);
      this.router.navigateByUrl(`/requests/detail/${this.request.id}`) 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {

    this.requestid = this.route.snapshot.params.id;    

    this.requestsvc.get(this.requestid).subscribe(
      request => {
        this.request = request;
      },
    );

    this.systemsvc.CheckLogin();  
    
    this.productsvc.list().subscribe(
      products => {
        this.products = products;
        console.log("Products", products);
      }, 
      err => {
        console.error(err);
      }
    );  

  }

}
