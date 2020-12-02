
import { TokenStorage } from './../core/token.storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';


@Injectable()
export class CouponService {


  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }

  getCoupons(): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())
    const url = this.baseUrl + '/coupon/admin/all';

    return this.http.get<any>(url, options);
  }

  postCupom(body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())
    const url = this.baseUrl + '/coupon/admin';

    return this.http.post<any>(url, body, options);
  }

  putCupom(id, body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())
    const url = this.baseUrl + `/coupon/admin/${id}`;

    return this.http.put<any>(url, body, options);
  }

  deleteCoupon(id): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/coupon/admin/${id}`;

    return this.http.delete<any>(url, options);
  }
  

  putCouponChangeStatus(id): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/coupon/admin/changeStatus/${id}`;

    return this.http.put<any>(url, options);
  }
}