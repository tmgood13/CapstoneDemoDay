import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './core/home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooldispPipe } from './core/pipes/booldisp.pipe';
import { FourOhFourComponent } from './core/four-oh-four/four-oh-four.component';

import { MenuComponent } from './core/menu/menu.component';
import { MenuitemComponent } from './core/menuitem/menuitem.component';

import { UserListComponent } from './prs/user/user-list/user-list.component';
import { UserDetailComponent } from './prs/user/user-detail/user-detail.component';
import { UserCreateComponent } from './prs/user/user-create/user-create.component';
import { UserEditComponent } from './prs/user/user-edit/user-edit.component';

import { VendorListComponent } from './prs/vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from './prs/vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './prs/vendor/vendor-detail/vendor-detail.component';
import { VendorCreateComponent } from './prs/vendor/vendor-create/vendor-create.component';

import { ProductListComponent } from './prs/product/product-list/product-list.component';
import { ProductEditComponent } from './prs/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './prs/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './prs/product/product-create/product-create.component';

import { RequestCreateComponent } from './prs/request/request-create/request-create.component';
import { RequestEditComponent } from './prs/request/request-edit/request-edit.component';
import { RequestListComponent } from './prs/request/request-list/request-list.component';
import { RequestDetailComponent } from './prs/request/request-detail/request-detail.component';
import { RequestMylistComponent } from './prs/request/request-mylist/request-mylist.component';

import { RequestReviewComponent } from './prs/request/request-review/request-review.component';

import { RequestLineCreateComponent } from './prs/requestlines/requestline-create/requestlines-create.component';
import { RequestLineEditComponent } from './prs/requestlines/requestline-edit/requestlines-edit.component';

import { SortPipe } from './core/pipes/sort.pipe';
import { SearchUserPipe } from './core/pipes/search-user.pipe';
import { SearchVendorPipe } from './core/pipes/search-vendor.pipe';
import { SearchProductPipe} from './core/pipes/search-product.pipe';
import { SearchRequestPipe} from './core/pipes/search-request.pipe';
import { SearchReviewPipe } from './core/pipes/search-review.pipe'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { TabletestComponent } from './core/logger/tabletest/tabletest.component';
import { AboutComponent } from './core/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    BooldispPipe,
    FourOhFourComponent,
    MenuComponent,
    MenuitemComponent,
    UserDetailComponent,
    UserCreateComponent,
    UserEditComponent,
    VendorListComponent,
    VendorEditComponent,
    VendorDetailComponent,
    VendorCreateComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    RequestCreateComponent,
    RequestEditComponent,
    RequestListComponent,
    RequestDetailComponent,
    RequestLineCreateComponent,
    RequestLineEditComponent,
    RequestReviewComponent,
    RequestMylistComponent,    
    SortPipe,
    SearchUserPipe,
    SearchVendorPipe,
    SearchProductPipe,
    SearchRequestPipe,
    HomeComponent,
    RequestReviewComponent,
    TabletestComponent,
    SearchReviewPipe,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatSliderModule,
    BrowserAnimationsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
