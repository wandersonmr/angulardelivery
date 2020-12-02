import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { CreateUpdateProductComponent } from 'src/app/product/create-update-product/create-update-product.component';
import { DialogConfirmationComponent } from 'src/app/dialog-confirmation/dialog-confirmation.component';
import { ProductComponent } from 'src/app/product/product.component';
import { ProductService } from 'src/app/service/product.service';
import { CreateUpdateCouponComponent } from 'src/app/coupon/create-update-coupon/create-update-coupon.component';
import { CouponComponent } from 'src/app/coupon/coupon.component';
import { CouponService } from 'src/app/service/coupon.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

  @Input() displayedColumns: any;
  @Input() dataSource: any = new MatTableDataSource([]);
  @Input() titleCard: String;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  isProduct:boolean = false;
  isCoupon: boolean = false;
  
  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar, 
    private productComponent: ProductComponent, private productService:  ProductService,
    private couponComponent: CouponComponent, private couponService: CouponService) {
   }
  
  ngOnChanges() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setButtonAdd()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createUpdateProduct(product?){
    let dialogRef = this.matDialog.open(CreateUpdateProductComponent, {
      width: '750px',
      data: product ? product : ''
    })
    dialogRef.beforeClose().subscribe(() => {this.productComponent.loadProducts()})
  }

  createUpdateCoupon(coupon?){
    let dialogRef = this.matDialog.open(CreateUpdateCouponComponent, {
      width: '750px',
      data: coupon ? coupon : ''
    })
    dialogRef.beforeClose().subscribe(() => {this.couponComponent.loadCoupons()})
  }

  openDialogConfirmation(message, id, action, subtract = false){
    let dialogRef = this.matDialog.open(DialogConfirmationComponent, {
      data: { 
        message: message, 
        id: id, 
        action: action, 
        subtract: subtract,
        quantityOrdersWAITING: null 
      }
    })
    dialogRef.beforeClose().subscribe(() => { 
      if(action == "deleteProduct") this.productComponent.loadProducts();
      if(action == "deleteCoupon") this.couponComponent.loadCoupons();
    })
  }

  putStatusProduct(id){
    this.productService.putProductChangeStatus(id).subscribe(()=> {
      this.snackBar.open('Status atualizado com sucesso.', null, { duration: 3000, }); 
    }, (error) => {
      console.log(error);
      this.snackBar.open('Ocorreu um problema ao atualizar o produto.', null, { duration: 3000, }); 
    })
  }

  putStatusCoupon(id){
    this.couponService.putCouponChangeStatus(id).subscribe(()=> {
      this.couponComponent.loadCoupons()
      this.snackBar.open('Status atualizado com sucesso.', null, { duration: 3000, }); 
    }, (error) => {
      console.log(error);
      this.snackBar.open('Ocorreu um problema ao atualizar o cupom.', null, { duration: 3000, }); 
    })
  }

  setButtonAdd(){
    if(this.titleCard == "Cupons") this.isCoupon = true;
    if(this.titleCard == "Produtos") this.isProduct = true;
  }
}
