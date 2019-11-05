import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../core/system/system.service';
import { Vendor } from '../../vendor/vendor.class';
import { VendorService } from '../../vendor/vendor.service';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';
import { RequestLineService } from '../requestline.service';
import { RequestLine } from '../requestline.class';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requestlines-edit',
  templateUrl: './requestlines-edit.component.html',
  styleUrls: ['./requestlines-edit.component.css']
})
export class RequestLineEditComponent implements OnInit {

  product: Product = null;
  requestline: RequestLine;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private systemsvc: SystemService,
    private vendorsvc: VendorService,
    private productsvc: ProductService,
    private requestlinesvc: RequestLineService
  ) { }

  save(): void {
    this.requestlinesvc.change(this.requestline).subscribe(
      res => { console.log("Response from request line edit", res);
      this.router.navigateByUrl('/requests/edit/{{request.id}}') 
    },
      err => { console.log(err); }
    );
  }

  delete(): void {
    this.requestlinesvc.remove(this.requestline).subscribe(
      res => { console.log("Response from request edit", res);
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
  }

}
