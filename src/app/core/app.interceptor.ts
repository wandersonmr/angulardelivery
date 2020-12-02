import {Component, Injectable} from '@angular/core';
import 'rxjs/add/operator/do';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {TokenStorage} from './token.storage';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorDialogComponent} from './error-dialog-component';
import {MatSnackBar} from '@angular/material';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          console.log('req url :: ' + req.url);
          if (err.status === 401) {
            // this.router.navigate(['user']);
          }
        }
      }
    );
  }

}
