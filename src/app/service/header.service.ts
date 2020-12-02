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
export class HeaderService {
  
  
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }
  
  getConf (): Observable<HeaderModel> {
    let data= this.tokenStorage.getToken()
    

    return this.http.get<HeaderModel>( this.baseUrl + '/configuration', {  headers: { Authorization:data}})
      .map(res => res)
      .catch((error: any) => throwError(error.message || error));
  }
  putConf (conf:HeaderModel ): Observable<HeaderModel> {
    let data= this.tokenStorage.getToken()
    
     
    return this.http.put<HeaderModel>( this.baseUrl + '/configuration',conf, {  headers: { Authorization:data}})
      .map(res => res)
      .catch((error: any) => throwError(error.message || error));
  }


  errorHandler(error: any): void {
    console.log(error);
  }
}