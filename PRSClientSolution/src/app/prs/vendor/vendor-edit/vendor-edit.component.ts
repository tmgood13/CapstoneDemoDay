import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendor: Vendor;
  verifyDelete: boolean = true;

  phone1: string = null;
  phone2: string = null;
  phone3: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vendorsvc: VendorService,
    private systemsvc: SystemService
    ) { }

  save(): void {
    if(this.phone1 != null && this.phone2 != null && this.phone3 != null) {
      this.vendor.phone = this.phone1 + "-" + this.phone2 + "-" + this.phone3;    
    } 
    this.vendorsvc.change(this.vendor).subscribe(
    res => { console.log("Response from vendor edit", res);
    this.router.navigateByUrl('/vendors/list') 
    },
      err => { console.log(err); }
    );
  }
  edit(): void {
    this.router.navigateByUrl(`/vendors/edit/${this.vendor.id}`);
  }
  verify(): void {
    this.verifyDelete = !this.verifyDelete;
  }
  delete(): void {
    this.vendorsvc.remove(this.vendor).subscribe(
      res => { console.log("Response from vendor edit", res);
      this.router.navigateByUrl('/vendors/list') 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    this.systemsvc.CheckAdmin();
    let vendorid = this.route.snapshot.params.id;
    this.vendorsvc.get(vendorid).subscribe(
      vendor => {
        this.vendor = vendor;
      },
    );
  }

}
