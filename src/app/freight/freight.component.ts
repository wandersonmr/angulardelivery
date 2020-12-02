import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { FreightService } from '../service/freight.service';

@Component({
  selector: 'app-freight',
  templateUrl: './freight.component.html',
  styleUrls: ['./freight.component.css']
})
export class FreightComponent implements OnInit {
  freight: any = 0;
  constructor(private freightService: FreightService, private dialogRef: MatDialogRef<DialogBodyComponent>,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadFreight();
  }

  loadFreight(){
    this.freightService.getFreight().subscribe(result => {
      this.freight = result.priceDefault;
    })
  }

  putFreight(){
    if(this.freight){
      this.freightService.putFreight(this.freight).subscribe(()=> {
        this.close();
        this.snackBar.open('Valor da entrega salvo com sucesso.', null, { duration: 3000, });
      }, error => {
        this.snackBar.open('Ocorreu um erro ao atualizar o frete.', null, { duration: 3000, });
      })
    }else {
      // this.snackBar.open('Os campos não podem ficar em branco e devem ser numéricos.', null, { duration: 3000, });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
