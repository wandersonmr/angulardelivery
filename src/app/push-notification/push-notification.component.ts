import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { PushService } from '../service/push.service';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {
  pushFormGroup: FormGroup;
  objPushNotification: any = {
    title: '',
    body: ''
  }
  constructor(private _formBuilder: FormBuilder, private _dialogRef: MatDialogRef<any>, 
    private pushService: PushService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.creatFormPush()
  }

  creatFormPush() {
    this.pushFormGroup = this._formBuilder.group({
      title: [''],
      body: ['']
    })
  }

  postPushNotification(){
    this.pushService.postPushNotification(this.objPushNotification).subscribe(() => {
      this.close();
      this.snackBar.open('Notificação enviada com sucesso.', null, { duration: 3000 });    
    }, error => {
      console.log(error);
      this.snackBar.open('Ocorreu um problema ao enviar a notificação.', null, { duration: 3000 });    
    })
  }

  close(): void {
    this._dialogRef.close();
  }
}
