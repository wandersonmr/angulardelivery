import { RequestModel } from './../shared/models/request.model';
import { TokenStorage } from './../core/token.storage';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {HeaderModel} from '../shared/models/Header.model';


@Injectable()
export class HomeService {
  
  
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }
  
  getOrders (): Observable<RequestModel> {
    let data= this.tokenStorage.getToken()
    

    return this.http.get<RequestModel>( this.baseUrl + '/order/last', {  headers: { Authorization:data}})
      .catch((error: any) => throwError(error.message || error));
  }
    errorHandler(error: any): void {
    console.log(error);
  }

  putStatus (id:any): Observable<RequestModel> {
    let data= this.tokenStorage.getToken()
    

    return this.http.put<RequestModel>( this.baseUrl + `/order/updateStatus/${id}`, {  headers: { Authorization:data}})
      .catch((error: any) => throwError(error.status || error));
  }

  putCancel(id: any): Observable<RequestModel> {
    let data= this.tokenStorage.getToken()
    

    return this.http.put<RequestModel>( this.baseUrl + `/order/admin/cancel/${id}`, {  headers: { Authorization:data}})
      .catch((error: any) => throwError(error.status || error));
  }

  getReport (params): Observable<RequestModel> {
    let data= this.tokenStorage.getToken()
    

    return this.http.get<RequestModel>( this.baseUrl + '/order/admin/findReport', {  headers: { Authorization:data}, params: params})
      .catch((error: any) => throwError(error.message || error));
  }
}