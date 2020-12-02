
import { TokenStorage } from './../core/token.storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';


@Injectable()
export class ProductService {


  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }

  getProducts(page, size): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + '/product/admin/all';

    return this.http.get<any>(url, options);
  }

  
  getProductById(id): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/product/admin/detail/${id}`;

    return this.http.get<any>(url, options);
  }


  postProduct(body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + '/product/admin';

    return this.http.post<any>(url, body, options);
  }

  putProduct(id, body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/product/admin/${id}`;

    return this.http.put<any>(url, body, options);
  }
  
  putProductChangeStatus(id): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/product/admin/changeStatus/${id}`;

    return this.http.put<any>(url, options);
  }
  
  deleteProduct(id): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/product/admin/${id}`;

    return this.http.delete<any>(url, options);
  }

}