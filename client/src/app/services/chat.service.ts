import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  user:any;
  private url = 'http://localhost:8090';  
  private socket;

  constructor(private http: Http) { }
  getAllUsers() {
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get("http://localhost:8090/chat/users",{headers:headers}).map(res=>res.json());
  }
  getMessages(chat_from_id,chat_to_id) {
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post("http://localhost:8090/chat/allmessages",{headers:headers,chat_from:chat_from_id,chat_to:chat_to_id}).map(res=>res.json());
  }

  addMessage(msg) {
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    this.socket.emit('show', {msg:msg.msg,to:msg.to_user_id,from:msg.from_user_id});
    return this.http.post("http://localhost:8090/chat/addMessage",{headers:headers,from_user_id:msg.from_user_id,to_user_id:msg.to_user_id,msg:msg.msg}).map(res=>res.json());    
  }
  getNewMessages(chat_from_id) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.emit('join', {id: chat_from_id});
      this.socket.on('new_msg', (data) => {
        observer.next(data);    
      });
      // this.socket.on('updateUsersList', (connectedUsers) => {
      //   observer.next(connectedUsers);    
      // });
      return observable;
    })     
    return observable;
  }  

}
