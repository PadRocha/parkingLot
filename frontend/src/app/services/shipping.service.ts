import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Vehiculo } from '../models/vehiculo';

import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = Global.url;
  }

  cliente(project: Cliente): Observable<any> {
    let params = JSON.stringify(project),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'save-project/', params, { headers: headers });
  }

  vehiculo(project: Vehiculo): Observable<any> {
    let params = JSON.stringify(project),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'save-project/', params, { headers: headers });
  }
}
