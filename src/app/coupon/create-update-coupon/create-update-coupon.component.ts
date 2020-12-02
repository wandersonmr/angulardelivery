import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CouponService } from 'src/app/service/coupon.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-update-coupon',
  templateUrl: './create-update-coupon.component.html',
  styleUrls: ['./create-update-coupon.component.css']
})
export class CreateUpdateCouponComponent implements OnInit {
  couponFormGroup: FormGroup;
  coupon: any = {};
  isUpdate: boolean = false;
  typeCoupon: String[] = ["Valor", "Porcentagem"];
  typeCouponSelected: any;
  minDate = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
  constructor( private _dialogRef: MatDialogRef<any>, private snackBar: MatSnackBar, 
    private couponService: CouponService, private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public couponParam: any,) {
      if (couponParam) {
        this.coupon = couponParam;
        this.coupon.dateAndHourValidate = new Date(this.coupon.dateAndHourValidate).toISOString().replace('.000Z', '')
        var date = new Date(this.coupon.dateAndHourValidate); 
        var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        this.coupon.dateAndHourValidate = moment(isoDateTime).toISOString(true).slice(0,16)
        this.typeCouponSelected = couponParam.typeCoupon
        this.isUpdate = true;
      }
     }

  ngOnInit() {
    this.createFormCoupon();
  }

  createFormCoupon(){
    this.couponFormGroup = this._formBuilder.group({
      code: [this.coupon.code],
      dateAndHourValidate: [this.coupon.dateAndHourValidate],
      status: [this.coupon.status === undefined ? this.coupon.status = true : this.coupon.status],
      typeCoupon: [this.coupon.typeCoupon],
      value: [this.coupon.value],
      valueMin: [this.coupon.valueMin]
    })
  }

  postCoupon(){
    this.coupon.typeCoupon = this.typeCouponSelected == "Porcentagem" ? 'PERCENT' : this.typeCouponSelected == "Valor" ? "VALUE" : null;
    this.coupon.status = this.coupon.status ? this.coupon.status : false;

    if(this.couponFormGroup.valid && this.coupon.typeCoupon && this.coupon.dateAndHourValidate){
      if(this.validTypeCoupon()){
        this.coupon.dateAndHourValidate = this.coupon.dateAndHourValidate ? new Date(this.coupon.dateAndHourValidate) : null;

        this.couponService.postCupom(this.coupon).subscribe(() => {
          this.close();
          this.snackBar.open('Cupom cadastrado com sucesso.', null, { duration: 3000 });
        }, error => {
          console.log(error);
          this.snackBar.open(error.error, null, { duration: 5000}); 
        });
      } 
    } else {
      this.snackBar.open('Preencha os campos obrigatórios.', null, { duration: 3000 });
    }
  }

  putCoupon() {
    this.coupon.typeCoupon = this.typeCouponSelected == "Porcentagem" ? 'PERCENT' : this.typeCouponSelected == "Valor" ? "VALUE" : null;
    this.coupon.status = this.coupon.status ? this.coupon.status : false;

    if(this.couponFormGroup.valid && this.coupon.typeCoupon && this.coupon.dateAndHourValidate){
      if(this.validTypeCoupon()){
        this.couponService.putCupom(this.coupon.id, this.coupon).subscribe(() => {
          this.close();
          this.snackBar.open('Cupom atualizado com sucesso.', null, { duration: 3000 });
        }, error => {
          console.log(error);
          this.snackBar.open("Ocorreu um problema ao atualizar o cupom", null, { duration: 5000}); 
        })
      }
    } else {
      this.snackBar.open('Preencha os campos obrigatórios.', null, { duration: 3000 });
    }
  }
  
  validTypeCoupon(){
    if(this.coupon.typeCoupon == 'PERCENT' && this.coupon.value > 99){
      this.snackBar.open("O valor do cupom não pode ser maior que 99%.", null, { duration: 5000}); 
      return false
    } else if(this.coupon.typeCoupon == 'VALUE' && this.coupon.valueMin < this.coupon.value){
      this.snackBar.open("O valor mínimo deve ser maior que o valor do cupon.", null, { duration: 5000}); 
      return false
    } else return true
  }

  reset() {
    this.couponFormGroup.reset();
  }

  close(): void {
    this._dialogRef.close();
  }

}
