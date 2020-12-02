import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../environments/environment';
import {AuthModel} from '../shared/models/Auth.model';


@Injectable()
export class AuthService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  attemptAuth(authModel: AuthModel): Observable<any> {
    return this.http.post( this.baseUrl + '/auth/admin', authModel, {responseType: 'json'})
      .map(res => res)
      .catch((error: any) => throwError(error.message || error));
  }

  errorHandler(error: any): void {
    console.log(error);
  }
}
