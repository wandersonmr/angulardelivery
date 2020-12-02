import { HeaderService } from './../../service/header.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsuarioLoginAuthService } from "../../service/UsuarioLoginAuth.service";
import { UsuarioLogado } from "../../core/usuario-logado";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { HeaderModel } from '../models/Header.model';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { PushNotificationComponent } from 'src/app/push-notification/push-notification.component';
import { FreightComponent } from 'src/app/freight/freight.component';



@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UsuarioLogado, HeaderService]
})
export class HeaderComponent implements OnInit {

  @ViewChild("toggleElement", { static: false }) ref: ElementRef;

  checked: boolean

  header: HeaderModel = {
    id: "",
    isOpen: true,
    timeDeliveryFinal: "",
    timeDeliveryInitial: "",

  };


  constructor(private usuarioLogado: UsuarioLogado, private headerService: HeaderService, private matDialog: MatDialog) {

  }

  ngOnInit() {
    this.getstatus();

  }

  deslogar() {
    this.usuarioLogado.logout();
  }

  getstatus() {
    this.headerService.getConf().subscribe((header) => {
      this.header = header;
      this.checked = this.header.isOpen;
    })
  }

  putstatus() {
    if (this.header.isOpen === true) {
      this.header.isOpen = false;
      this.headerService.putConf(this.header).subscribe((header) => {

      });
    } else {
      this.header.isOpen = true;
      this.headerService.putConf(this.header).subscribe((header) => {
      });
    }
  }

  openPushNotification() {
    let dialogRef = this.matDialog.open(PushNotificationComponent, {
      width: '650px',
    })
    dialogRef.beforeClose().subscribe(() => {});
  }

  
  openDialogFreight() {
    let dialogRef = this.matDialog.open(FreightComponent, {
      width: '550px',
    })
    dialogRef.beforeClose().subscribe(() => {});
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.header
    this.matDialog.open(DialogBodyComponent, dialogConfig);
  }
}
