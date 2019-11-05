import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.class';
import { Vendor } from '../../vendor/vendor.class';
import { VendorService } from '../../vendor/vendor.service';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  vendors: Vendor[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private systemsvc: SystemService
  ) { }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let productid = this.route.snapshot.params.id;
    this.productsvc.get(productid).subscribe(
      product => {
        this.product = product;
      },
      err => { console.error(err); }
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
