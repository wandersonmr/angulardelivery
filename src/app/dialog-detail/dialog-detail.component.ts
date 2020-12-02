import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {
  vazio = Array(0)
  totalValue = 0;
  productValue = 0;
  coupon = { code: "", value: 0,typeCoupon: "" };
  dataSource: any;
  displayedColumns: String[] = ["quantity", "name", "productValue" ]
  constructor(public dialogRef: MatDialogRef<DialogDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = data;
    console.log(data);

  }

  ngOnInit() {
    const datePipe = new DatePipe('en-US');
    this.calcTotal();
  }

  close() {
    this.dialogRef.close();
  }

  calcTotal() {
    //soma o valor total de cada produto
    this.dataSource.productOrder.forEach(element => {
      this.totalValue = this.totalValue + (element.quantity * element.productSize.price);
      //se houver adicionais soma no valor total
      if (element.additionals.length > 0) {
        element.additionals.forEach(additional => {
          this.totalValue = this.totalValue + (additional.quantity * additional.productAdditional.price);
        });
      }
    });
    //soma o valor da entrega
    this.totalValue = this.totalValue + this.dataSource.deliveryPrice;
    //cupom
    if (this.dataSource.coupon) {
      this.coupon.code = this.dataSource.coupon.code;
      this.coupon.value = this.dataSource.coupon.value;
      this.coupon.typeCoupon = this.dataSource.coupon.typeCoupon;

      if (this.dataSource.coupon.typeCoupon === "PERCENT") {
        let discount = this.totalValue * (this.dataSource.coupon.value/100);

        this.totalValue = this.totalValue - discount;
      }
    }
  }
  calcProduct(element){
    this.productValue = 0;
    this.productValue = this.productValue + (element.quantity * element.productSize.price);
    if (element.additionals.length > 0) {
      element.additionals.forEach(additional => {
        this.productValue = this.productValue + (additional.quantity * additional.productAdditional.price);
      });
    }
    return this.productValue;
  }
  
  onPrint(){
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          *{
            font-size: 10px !important;
            text-align-last: left;
            font-family: Tahoma, Geneva, sans-serif  !important; 
            line-height: 1.3em;
            color: black !important;
            margin-left:0px;
            margin-right:5px;
            font-weight: 600 !important;

          }
          .teste {
            width: 280x !important;
            margin-top:-20px;
          }
          .titleDetail{
            text-transform: uppercase; 
            margin-top:5px !important;
            text-align-last: center;
            width:100% !important;
            
          }
          .line{
            border-bottom: 2px dashed gray !important;
            margin-bottom: 10px;
          }
          .money {
            text-align-last: right;
            font-size:14px !important;

          }

          .deliveryMoney{
            width:100% !important;
            text-align:right !important;
            display: block;
            font-size: 12px !important;

          }

          .product {
            margin-top: 6px !important;
          }
          .productName {
            font-size: 12px !important;
            margin-left: -10px;
          }
          .additional{
            font-size: 10px !important;
          }
          .containerAdditional{
            margin-left: -10px;
          }
          td.mat-cell, td.mat-footer-cell, th.mat-header-cell {
            padding: 5px;
            text-align: center;
          }
          .main-table{
            width: 100% !important;
          }
          .fontBig{
            font-size: 12px !important;
          }

          .qtd{
            marging-top: -10px !important;

          }

          .total{
            padding-bottom:30px !important;
            font-size:12px !important;
          }

          .rodape{
            display:block !important;
          }

          .address{
            font-size: 12px !important;
            width: 100% !important;

          }
          .productValue{
            font-size: 12px !important;
          }
          .pedido{
            display:block !important;
          }


          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  dateParser(dateStr: any): string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this 2020,8,1,10,39,9,228000000

    let validDate = (dateStr[2] > 9 ? dateStr[2] : '0' + dateStr[2]) + '/' + (dateStr[1] > 9 ? dateStr[1] : '0' + dateStr[1]) + '/' + dateStr[0]

    let validHour = (dateStr[3] > 9 ? dateStr[3] : '0' + dateStr[3]) + 'h' + (dateStr[4] > 9 ? dateStr[4] : '0' + dateStr[4]) + 'min'

    return validDate + " às " + validHour;
  }


  parseProductSize(size : any): string{
    if(size === "GRAMS"){
      return "gr"
    }
    return "Kg"
  }

}
