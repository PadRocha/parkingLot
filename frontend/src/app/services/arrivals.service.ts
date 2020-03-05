import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = Global.url;
  }

  getLotes(): Observable<any> {
    return this._http.get(this.url + 'lote');
  }

  getRegistros(): Observable<any> {
    return this._http.get(this.url + 'registro');
  }
}
