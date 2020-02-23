import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// import { Project } from '../models/project';
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


}
