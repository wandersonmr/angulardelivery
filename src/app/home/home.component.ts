import { RequestModel } from './../shared/models/request.model';
import { HomeService } from './../service/home.service';
import { Component, OnInit} from '@angular/core';
import { TokenStorage } from '../core/token.storage';
import { Router } from '@angular/router';
import { UsuarioLogado } from '../core/usuario-logado';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UsuarioLogado, HomeService]
})




export class HomeComponent implements OnInit {
  isLinear = false;
  clientName: String;
  orders : RequestModel;
  idTimeOut: any;
  constructor(private tokenStorage: TokenStorage, private matDialog: MatDialog, private router: Router, private usuarioLogado: UsuarioLogado, public homeService: HomeService) { }

  dataSource = [];
  dataSourceDelivering = [];
  dataSourceDelivered = [];
  dataSourcePREPARING = []
  dataSourceAux = [];
  dataSourceDeliveringAux = [];
  dataSourceDeliveredAux = [];
  dataSourcePREPARINGAux = [];
  displayedColumns: string[] = ['position','dateHour', 'name', 'weight', 'symbol','detail'];
  displayedColumns2: string[] = ['position','dateHour', 'name', 'weight', 'symbol', 'detail'];
  
  ngOnInit() {
    this.usuarioLogado.verificarUsuarioLogado();
    this.getOrders()
  }

   async getOrders() {
    this.homeService.getOrders().subscribe((data) => {
      this.orders = data;
      this.dataSource = [];
      this.dataSourceDelivering = [];
      this.dataSourceDelivered = [];
      this.dataSourcePREPARING = [];

      if(this.orders.WAITING)
      this.dataSource = this.orders.WAITING;
      if(this.orders.PREPARING)
      this.dataSourcePREPARING = this.orders.PREPARING;
      if(this.orders.DELIVERING)
      this.dataSourceDelivering = this.orders.DELIVERING;
      if(this.orders.DELIVERED)
      this.dataSourceDelivered = this.orders.DELIVERED; 
      
      if(this.orders.WAITING){
        if(this.orders.WAITING.length > this.tokenStorage.getQuantityOrders()){
          this.alert();   
          this.tokenStorage.saveQuantityOrders(this.orders.WAITING.length);   
        }
      }
      this.dataSourceAux = this.dataSource;
      this.dataSourceDeliveringAux =  this.dataSourcePREPARING;
      this.dataSourceDeliveredAux = this.dataSourceDelivered;
      this.dataSourcePREPARINGAux = this.dataSourcePREPARING;
    })
    await this.delay(10000);
    this.getOrders();  
  }
    
    private delay(ms: number): Promise<boolean> {
      return new Promise(resolve => {
        this.idTimeOut = setTimeout(() => {
          resolve(true);
        }, ms);   
      });
    }

    openDialog(data) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = data
      this.matDialog.open(DialogDetailComponent, dialogConfig);
    }

    openDialogConfirmation(message, id, action, subtract = false){
      let dialogRef = this.matDialog.open(DialogConfirmationComponent, {
        data: { 
          message: message, 
          id: id, 
          action: action, 
          subtract: subtract,
          quantityOrdersWAITING: this.orders.WAITING ? this.orders.WAITING.length : null 
        }
      })
      dialogRef.beforeClose().subscribe(() => { this.getOrders()})
    }

    filter(){
      for (let i = 0; i <= this.idTimeOut; i++){
        clearTimeout(i)
      }
      
      if(this.clientName){
        this.dataSource = [];
        this.dataSourceDelivering = [];
        this.dataSourceDelivered = [];
        this.dataSourcePREPARING = [];

        this.dataSourceAux.forEach( order =>{
          if(order.user.name.toLowerCase( ).match(this.clientName.toLowerCase()))
          this.dataSource.push(order)
        })

        this.dataSourcePREPARINGAux.forEach( order =>{
          if(order.user.name.toLowerCase( ).match(this.clientName.toLowerCase()))
          this.dataSourcePREPARING.push(order)
        })

        this.dataSourceDeliveringAux.forEach( order =>{
          if(order.user.name.toLowerCase( ).match(this.clientName.toLowerCase()))
          this.dataSourceDelivering.push(order)
        })

        this.dataSourceDeliveredAux.forEach( order =>{
          if(order.user.name.toLowerCase( ).match(this.clientName.toLowerCase()))
          this.dataSourceDelivered.push(order)
        })

      } else {
        this.getOrders()
      }
    }

    dateParser(dateStr : any) : string {
      // 2018-01-01T12:12:12.123456; - converting valid date format like this 2020,8,1,10,39,9,228000000
    
      let validDate = (dateStr[2] > 9 ? dateStr[2] : '0'+ dateStr[2] ) + '/' + (dateStr[1] > 9 ? dateStr[1] : '0'+ dateStr[1] ) + '/' + dateStr[0]
  
      let validHour = (dateStr[3] > 9 ? dateStr[3] : '0'+ dateStr[3] ) + 'h' + (dateStr[4] > 9 ? dateStr[4] : '0'+ dateStr[4] ) + 'min' 
      
      return validDate +" às "+validHour;
    }

    alert(){
      var audio = new Audio();
      audio.src = "../../assets/sonds/alert.mp3";
      audio.load();
      audio.play();
    }  
  }
