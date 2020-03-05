import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Vehiculo } from '../models/vehiculo';
import { Subscripcion } from '../models/subscripcion';
import { Registro } from '../models/registro';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = environment.url;
  }

  sendRegistro(registro: Registro): Observable<any> {
    let params = JSON.stringify(registro),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registro', params, { headers: headers });
  }

  sendCliente(cliente: Cliente, image: Blob): Observable<any> {
    let fd: any = new FormData();
    fd.append('name', cliente.name);
    fd.append('phone', cliente.phone);
    fd.append('license', cliente.license);
    fd.append('typeLicense', cliente.typeLicense);
    fd.append('image', image, 'image.jpeg');
    if (cliente.avales !== '') fd.append('avales', cliente.avales);
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'cliente', fd, { headers: headers });
  }

  sendVehiculo(vehiculo: Vehiculo): Observable<any> {
    let params = JSON.stringify(vehiculo),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'vehiculo', params, { headers: headers });
  }

  sendSubscripcion(subscripcion: Subscripcion): Observable<any> {
    let params = JSON.stringify(subscripcion),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'subscripcion', params, { headers: headers });
  }
}
