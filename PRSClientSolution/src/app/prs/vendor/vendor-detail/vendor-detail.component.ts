import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor: Vendor;

  constructor(
    private route: ActivatedRoute,
    private vendorsvc: VendorService,
    private systemsvc: SystemService
  ) { }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let vendorid = this.route.snapshot.params.id;
    this.vendorsvc.get(vendorid).subscribe(
      vendor => {
        this.vendor = vendor;
      },
      err => { console.error(err); }
    );
  }

}
