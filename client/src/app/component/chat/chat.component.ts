import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { ChatService} from "../../services/chat.service";
import {Router, CanActivate} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users : any;
  allusers:any;
  chat_from_id : any;
  chat_to_id : any;
  current_user;
  msgs: any;
  textmessage:String;
  currentusername:String = "Message";
  query:String = null;
  private socket: SocketIOClient.Socket;
  connection;
  constructor(
    private router: Router,
    private authservice : AuthService,
    private chatservice : ChatService ) {
   }
   
  ngOnInit() {
    if(!this.authservice.loggedIn()) {
      this.router.navigate(["/"]);
    } else {
      this.getAllusers();
    }
  }

  getAllusers() {
    this.chatservice.getAllUsers().subscribe(users=>{
      this.allusers = this.users = users.users;
    })
    this.authservice.getProfile().subscribe(profile=>{
      this.current_user = profile.user;
      this.chat_from_id = this.current_user._id;
      this.connection = this.chatservice.getNewMessages(this.chat_from_id).subscribe(ms=> {
        console.log(ms);
        let newmsg = {
          msg:ms.msg,
          time: new Date()
        }
        if(this.chat_to_id==ms.msg_from) {
          this.msgs.push(newmsg); 
        }
      })
    });
  }

  getMessages(id){ 
    this.chat_to_id = id;
    this.authservice.getUser(id).subscribe(user=>{
      this.currentusername = user.user.name;
    });
    this.chatservice.getMessages(this.chat_from_id,this.chat_to_id).subscribe(msgs=>{
      this.msgs = msgs.msgs;
    });
  }
  sendMessage() {
    let msg ={
      from_user_id : this.chat_from_id,
      to_user_id  : this.chat_to_id,
      msg : this.textmessage
    }
    if(this.textmessage.trim() && this.chat_to_id) {
      this.chatservice.addMessage(msg).subscribe(msgs=>{
      });
      this.getMessages(this.chat_to_id);
      
      this.textmessage = '';
    }
  }
  keyDownFunction(event) {
    if(event.keyCode == 13) {
      event.preventDefault();
      this.sendMessage();
    }
  }
  filterItem() {
    if(!this.query)  {
      this.users = this.allusers;
    } else {
      this.users = Object.assign([], this.users).filter(
        item => item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
      );
    } 
  }
}
