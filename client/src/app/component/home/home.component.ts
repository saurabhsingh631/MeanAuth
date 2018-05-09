import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import {Router, CanActivate} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentForm: String = 'Register';
  constructor(private router: Router,private authservice : AuthService ) { }

  ngOnInit() {
    if(this.authservice.loggedIn()) {
      this.router.navigate(["/profile"]);
    }
  }
  changeForm() {
    if(this.currentForm == 'Register'){
      this.currentForm ='Login';
    } else{
      this.currentForm = 'Register';
    }
  }
}
