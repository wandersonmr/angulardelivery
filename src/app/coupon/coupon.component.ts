import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { CouponService } from '../service/coupon.service';
import { Conversoes } from '../shared/utils/conversoes';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  title: String = "Cupons";
  couponName: String;
  dataSource: any = new MatTableDataSource([]);
  dataSourceAux: any = new MatTableDataSource([]);
  displayedColumns: String[] = ['id', 'code', 'dateAndHourValidate', 'typeCoupon', 'status', 'value', 'couponOptions']
  
  constructor(private snackBar: MatSnackBar, private couponService: CouponService, public conversoes: Conversoes) { }

  ngOnInit() {
    this.loadCoupons();
  }

  loadCoupons(){
    this.couponService.getCoupons().subscribe(result => {
      this.dataSource.data = result
      this.dataSource.data.forEach(element => { 
        element.dateAndHourValidate =  this.conversoes.dateParser(element.dateAndHourValidate);  
        element.typeCoupon = element.typeCoupon == "PERCENT" ? "Porcentagem" : "Valor";     
      });
      this.dataSourceAux = this.dataSource
    }, error => {
      console.log(error);
      this.snackBar.open('Ocorreu um problema ao buscar os cupons.', null, { duration: 5000, }); 
    })
  }

  filter(){
    if(this.couponName){
      this.dataSource = new MatTableDataSource([]);
      this.dataSourceAux.data.forEach( coupon =>{
        if(coupon.code.toLowerCase( ).match(this.couponName.toLowerCase()))
        this.dataSource.data.push(coupon)
      })
    }else {
      this.loadCoupons();
    }
  }

}
