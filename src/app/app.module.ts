import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './service/auth-service.service';
import {TokenStorage} from './core/token.storage';
import {Interceptor} from './core/app.interceptor';
import {ErrorDialogComponent} from './core/error-dialog-component';
import { HomeComponent } from './home/home.component';
import {CustomMaterialModule} from './core/material.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HeaderComponent } from './shared/header/header.component';
import {MatIconModule, MatListModule, MatSnackBarModule, MatSelectModule, MatStepperModule, MatTooltipModule, MatSlideToggle, MatSlideToggleModule, MatDialogModule, MatPaginatorModule, MatPaginatorIntl, MAT_CHECKBOX_CLICK_ACTION, MatCheckboxModule, MatTabsModule, MatProgressBar, MatProgressBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatMenuModule} from '@angular/material/menu';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductComponent } from './product/product.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { HomeService } from './service/home.service';
import { TableComponent } from './shared/table/table.component';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material';
import localePT from '@angular/common/locales/pt';
import localeExtraPT from '@angular/common/locales/extra/pt';
import { CustomPaginator } from './shared/utils/custom-paginator';
import { ProductService } from './service/product.service';
import { CreateUpdateProductComponent } from './product/create-update-product/create-update-product.component';
import { CategoryService } from './service/category.service';
import { CouponComponent } from './coupon/coupon.component';
import { CouponService } from './service/coupon.service';
import { CreateUpdateCouponComponent } from './coupon/create-update-coupon/create-update-coupon.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { PushService } from './service/push.service';
import { Conversoes } from './shared/utils/conversoes';
import { CategoryComponent } from './category/category.component';
import { CreateUpdateCategoryComponent } from './category/create-update-category/create-update-category.component';
import { FreightComponent } from './freight/freight.component';
import { FreightService } from './service/freight.service';
import { ReportComponent } from './report/report.component';

registerLocaleData(localePT, 'pt', localeExtraPT);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorDialogComponent,
    HeaderComponent,
    DialogBodyComponent,
    DialogDetailComponent,
    ProductComponent,
    DialogConfirmationComponent,
    TableComponent,
    CreateUpdateProductComponent,
    CouponComponent,
    CreateUpdateCouponComponent,
    PushNotificationComponent,
    CategoryComponent,
    CreateUpdateCategoryComponent,
    FreightComponent,
    ReportComponent 
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatStepperModule,
        FlexLayoutModule,
        MatIconModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatIconModule,
        MatListModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTabsModule,
        MatSelectModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        DragDropModule
    ],
  entryComponents: [ErrorDialogComponent,CreateUpdateProductComponent, CreateUpdateCategoryComponent, CreateUpdateCouponComponent, PushNotificationComponent, DialogBodyComponent,DialogDetailComponent, FreightComponent, DialogConfirmationComponent],
  providers: [ErrorDialogComponent, AuthService, CouponService, PushService, TokenStorage, TokenStorage, CategoryService, FreightService, HomeService, ProductService, ProductComponent, CouponComponent, Conversoes,
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' },
    { provide: HTTP_INTERCEPTORS,useClass: Interceptor, multi : true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
