import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router }  from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authservices: AuthService,
    private router: Router,
    private flashmessageservice: FlashMessagesService,
  ) { }

  ngOnInit() {
  }
  logutUser() {
    this.authservices.logOutUser();
    this.flashmessageservice.show("You are logged out",{
      cssClass : "alert-success",
      timeot : 3000
    });
    this.router.navigate(["/login"]);
    return false;
  }
}
