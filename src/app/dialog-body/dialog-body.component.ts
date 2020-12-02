import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HeaderModel } from '../shared/models/Header.model';
import { HeaderService } from './../service/header.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css'],
  providers: [HeaderService]
})
export class DialogBodyComponent implements OnInit {
  inicio: any; final: any;
  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: HeaderModel, 
    private headerService: HeaderService,
    private snackBar: MatSnackBar) { 
      this.inicio = this.data.timeDeliveryInitial,
      this.final = this.data.timeDeliveryFinal
    }

  ngOnInit() {}
  
  close() {
    this.dialogRef.close();
  }

  alterar() {
    if(this.inicio === ''|| this.inicio === null || this.final === ''|| this.final === null){
      this.snackBar.open('Os campos não podem ficar em branco e devem ser numéricos.', null, { duration: 3000, });
    }
    else if(this.inicio >= this.final){
      this.snackBar.open('A data de início deve ser menor que a data final.', null, { duration: 3000, });  
    }else {
      this.data.timeDeliveryFinal = this.final,
      this.data.timeDeliveryInitial = this.inicio
      
      this.headerService.putConf(this.data).subscribe(()=>{ 
        this.snackBar.open('Horário atualizado com sucesso.', null, { duration: 3000, });
      }, error => {
        this.snackBar.open('Ocorreu um problema ao atualizar o horário.', null, { duration: 3000, });
      })
      this.dialogRef.close();
    }
  }

}
