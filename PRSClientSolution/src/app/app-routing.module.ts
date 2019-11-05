import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOhFourComponent } from './core/four-oh-four/four-oh-four.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';

import { UserListComponent } from './prs/user/user-list/user-list.component';
import { UserCreateComponent } from './prs/user/user-create/user-create.component';
import { UserDetailComponent } from './prs/user/user-detail/user-detail.component';
import { UserEditComponent } from './prs/user/user-edit/user-edit.component';

import { VendorListComponent } from './prs/vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './prs/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './prs/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './prs/vendor/vendor-edit/vendor-edit.component';

import { ProductListComponent } from './prs/product/product-list/product-list.component';
import { ProductCreateComponent } from './prs/product/product-create/product-create.component';
import { ProductDetailComponent } from './prs/product/product-detail/product-detail.component';
import { ProductEditComponent } from './prs/product/product-edit/product-edit.component';

import { RequestListComponent } from './prs/request/request-list/request-list.component';
import { RequestCreateComponent } from './prs/request/request-create/request-create.component';
import { RequestDetailComponent } from './prs/request/request-detail/request-detail.component';
import { RequestEditComponent } from './prs/request/request-edit/request-edit.component';
import { RequestMylistComponent } from './prs/request/request-mylist/request-mylist.component';

import { RequestReviewComponent } from './prs/request/request-review/request-review.component';

import { RequestLineCreateComponent } from './prs/requestlines/requestline-create/requestlines-create.component';
import { RequestLineEditComponent } from './prs/requestlines/requestline-edit/requestlines-edit.component';

const routes: Routes = [
  { path:'', redirectTo: '/home', pathMatch: 'full'},
  { path:'home', component: HomeComponent },
  { path:'about', component: AboutComponent },
  
  { path:'users/list', component: UserListComponent },
  { path:'users/create', component: UserCreateComponent },
  { path:'users/detail/:id', component: UserDetailComponent },
  { path:'users/edit/:id', component: UserEditComponent },

  { path:'vendors/list', component: VendorListComponent },
  { path:'vendors/create', component: VendorCreateComponent },
  { path:'vendors/detail/:id', component: VendorDetailComponent },
  { path:'vendors/edit/:id', component: VendorEditComponent },

  { path:'products/list', component: ProductListComponent },
  { path:'products/create', component: ProductCreateComponent },
  { path:'products/detail/:id', component: ProductDetailComponent },
  { path:'products/edit/:id', component: ProductEditComponent },
 
  { path:'requests/list', component: RequestListComponent },
  { path:'requests/create', component: RequestCreateComponent },
  { path:'requests/detail/:id', component: RequestDetailComponent },
  { path:'requests/edit/:id', component: RequestEditComponent },
  { path:'requests/mylist', component: RequestMylistComponent },

  { path:'requests/review', component: RequestReviewComponent },
  
  { path:'requestlines/create/:id', component: RequestLineCreateComponent },
  { path:'requestlines/edit/:id', component: RequestLineEditComponent },
  
  { path:'**', component: FourOhFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
