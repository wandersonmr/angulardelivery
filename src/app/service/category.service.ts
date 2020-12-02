
import { TokenStorage } from './../core/token.storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';


@Injectable()
export class CategoryService {


  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }

  getCategory(): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + '/category/admin/all/orderPosition';

    return this.http.get<any>(url, options);
  }

  postCategory(body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + '/category/admin';

    return this.http.post<any>(url, body, options);
  }

  putCategory(id, body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/category/admin/${id}`;

    return this.http.put<any>(url, body, options);
  }

  putPosition(body): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + '/category/admin/updatePositions';

    return this.http.put<any>(url, body, options);
  }

  putCategoryChangeStatus(id): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/category/admin/changeStatus/${id}`;

    return this.http.put<any>(url, options);
  }

  deleteCategory(id): Observable<any> {
    const options: any = {}
    options.headers = new HttpHeaders()
      .set('Authorization', this.tokenStorage.getToken())

    const url = this.baseUrl + `/category/admin/${id}`;

    return this.http.delete<any>(url, options);
  }
  
}