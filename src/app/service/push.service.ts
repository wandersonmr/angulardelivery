
import { TokenStorage } from './../core/token.storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';


@Injectable()
export class PushService {


  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }

  postPushNotification(body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + '/push/sendAll';

    return this.http.post<any>(url, body, options);
  }
}