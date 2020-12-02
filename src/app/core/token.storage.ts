import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USUARIO_LOGADO = 'usuarioLogado';
const QUANTITY_ORDERS = 'quantityOrders'

@Injectable()
export class TokenStorage {

  constructor() { }

  public signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USUARIO_LOGADO);
    window.sessionStorage.removeItem(QUANTITY_ORDERS);
    window.sessionStorage.clear();
  }

  public saveToken(token: any) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  salvarUsuario(usuario) {
    window.sessionStorage.setItem(USUARIO_LOGADO, JSON.stringify(usuario));
  }

  getUsuarioLogado() {
    const usuarioAuthLogado = window.sessionStorage.getItem(USUARIO_LOGADO);
    return JSON.parse(usuarioAuthLogado);
  }

  
  public saveQuantityOrders(quantity: any) {
    window.sessionStorage.removeItem(QUANTITY_ORDERS);
    window.sessionStorage.setItem(QUANTITY_ORDERS, quantity);
  }

  public getQuantityOrders(): any {
    return sessionStorage.getItem(QUANTITY_ORDERS)
  }

}
