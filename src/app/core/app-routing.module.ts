import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import { ProductComponent } from '../product/product.component';
import { CouponComponent } from '../coupon/coupon.component';
import { CategoryComponent } from '../category/category.component';
import { ReportComponent } from '../report/report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'coupon', component: CouponComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'report', component: ReportComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
