import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.class';
import { Vendor } from '../../vendor/vendor.class';
import { VendorService } from '../../vendor/vendor.service';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  verifyDelete: boolean = true;
  vendors: Vendor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private systemsvc: SystemService
    ) { }

  save(): void {
    console.log(this.product);
    this.productsvc.change(this.product).subscribe(
      res => { console.log("Response from product edit", res);
      this.router.navigateByUrl('/products/list') 
    },
      err => { console.log(err); }
    );
  }
  edit(): void {
    this.router.navigateByUrl(`/products/edit/${this.product.id}`);
  }
  verify(): void {
    this.verifyDelete = !this.verifyDelete;
  }
  delete(): void {
    this.productsvc.remove(this.product).subscribe(
      res => { console.log("Response from product edit", res);
      this.router.navigateByUrl('/products/list') 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let productid = this.route.snapshot.params.id;
    this.productsvc.get(productid).subscribe(
      product => {
        this.product = product;
      },
    );
    this.vendorsvc.list().subscribe(
      vendors => {
        this.vendors = vendors;
      }, 
      err => {
        console.error(err);
      }
    );
  }

}
