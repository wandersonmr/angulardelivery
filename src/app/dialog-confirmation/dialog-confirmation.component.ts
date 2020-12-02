import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HomeService } from '../service/home.service';
import { TokenStorage } from '../core/token.storage';
import { ProductService } from '../service/product.service';
import { CouponService } from '../service/coupon.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent implements OnInit {
  message: String;
  action: String;
  id: any;
  subtract: boolean;
  quantityOrdersWAITING:any;

  constructor(private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private param: any,
    private homeService: HomeService, private productService: ProductService, 
    private snackBar: MatSnackBar, private tokenStorage: TokenStorage, 
    private couponService: CouponService, private categoryService: CategoryService) { 
      this.message = param.message;
      this.id = param.id;
      this.action = param.action;
      this.subtract = param.subtract;
      this.quantityOrdersWAITING = param.quantityOrdersWAITING;
    }

  ngOnInit() {}

  confirmation(){
    if(this.action === 'update') this.putStatus()
    if(this.action === 'cancel') this.putCancel()
    if(this.action === 'deleteProduct') this.deleteProduct(this.id)
    if(this.action === 'deleteCoupon') this.deleteCoupon(this.id)
    if(this.action === 'deleteCategory') this.deleteCategory(this.id)
    if(this.subtract) this.tokenStorage.saveQuantityOrders(this.quantityOrdersWAITING - 1)  
  }

  putStatus() {
    this.homeService.putStatus(this.id).subscribe(()=>{
      this.close(); 
    }, error => {
      console.log(error);  
      this.snackBar.open('Ocorreu um erro Interno', null, { duration: 3000, });  
    })  
  }

  putCancel(){
    this.homeService.putCancel(this.id).subscribe(()=>{
      this.close();
    }, error => {
      console.log(error);  
      this.snackBar.open('Ocorreu um erro Interno', null, { duration: 3000, });  
    })  
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.close();
      this.snackBar.open('Produto removido com sucesso', null, { duration: 3000, });  
    }, error => {
      console.log(error);  
      this.snackBar.open(error.error, null, { duration: 3000, });  
    })
  }

  deleteCoupon(id) {
    this.couponService.deleteCoupon(id).subscribe(() => {
      this.close();
      this.snackBar.open('Produto removido com sucesso', null, { duration: 3000, });  
    }, error => {
      console.log(error);  
      this.snackBar.open(error.error, null, { duration: 3000, });  
    })
  }

  deleteCategory(id) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.close();
      this.snackBar.open('Categoria removido com sucesso', null, { duration: 3000, });  
    }, error => {
      console.log(error);  
      this.snackBar.open(error.error, null, { duration: 3000, });  
    })
  }

  close() {
    this._dialogRef.close();
  }
}
