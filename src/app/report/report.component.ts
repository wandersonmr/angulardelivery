import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  initialDate: any;
  finalDate: any;
  maxDate = new Date();
  report:any = {};
  isWait: boolean = false;

  constructor(private homeService: HomeService, private snackBar: MatSnackBar,) { }

  ngOnInit() {
  }

  getReport(){
    if(this.initialDate && this.finalDate){
      if(this.initialDate <= this.finalDate){
        let params = {
          initial: moment(this.initialDate).format('DDMMYYYY'),
          last: moment(this.finalDate).format('DDMMYYYY')
        }
        this.isWait = true;
        this.homeService.getReport(params).subscribe(result => {
          this.report = result;
          this.isWait = false;
        }, error => {
          console.log(error);   
          this.isWait = false;
           this.snackBar.open('Ocorreu um erro ao buscar relatório.', null, { duration: 5000, });
        })  
      } else
       this.snackBar.open('A data inicial deve ser menor que a data final.', null, { duration: 5000, });     
    } else
      this.snackBar.open('Informe o período do relatório.', null, { duration: 5000, });  
  }
}
