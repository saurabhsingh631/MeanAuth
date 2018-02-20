import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import { Jsonp } from '@angular/http/src/http';
import {tokenNotExpired} from "angular2-jwt";
@Injectable()
export class AuthService {
  authToken: any;
  user:any;
  constructor(private http: Http) { }
  
  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post("users/register",user,{headers:headers}).map(res=>res.json());
  }
  loginUser(user) {
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post("users/authentication",user,{headers:headers}).map(res=>res.json());
  }
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization",this.authToken);
    headers.append("Content-Type","application/json");
    return this.http.get("users/profile",{headers:headers}).map(res=>res.json());
  }
  storeUserdata(token,user) {
    localStorage.setItem("id_token",token);
    localStorage.setItem("user",JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    this.authToken = localStorage.getItem("id_token");
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  logOutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
