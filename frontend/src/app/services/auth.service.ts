import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  // public registerUser(user: User): Observable<any> {
  //   let params = JSON.stringify(user),
  //     headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.post(this.url + 'register', params, { headers: headers });
  // }

  public loginUser(user: User): Observable<any> {
    let params = JSON.stringify(user),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  public getToken(): String {
    return localStorage.getItem('token');
  }

  public loggedIn(): Boolean {
    return !!localStorage.getItem('token');
  }
}